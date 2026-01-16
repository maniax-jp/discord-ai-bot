import {
  Client,
  Events,
  GatewayIntentBits,
  Message,
  Partials,
} from "discord.js";
import type { Config } from "./config.js";
import type { AIService } from "./services/ai.js";

/** Discord BOTクライアント */
export class DiscordBot {
  private client: Client;
  private config: Config;
  private aiService: AIService;

  constructor(config: Config, aiService: AIService) {
    this.config = config;
    this.aiService = aiService;

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [Partials.Channel],
    });

    this.setupEventHandlers();
  }

  /** イベントハンドラーの設定 */
  private setupEventHandlers(): void {
    // 起動完了時
    this.client.once(Events.ClientReady, (readyClient) => {
      console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    // メッセージ受信時
    this.client.on(Events.MessageCreate, (message) =>
      this.handleMessage(message)
    );
  }

  /** メッセージハンドリング */
  private async handleMessage(message: Message): Promise<void> {
    // BOT自身のメッセージは無視
    if (message.author.bot) return;

    // BOTがメンションされているか確認
    if (!this.client.user) return;
    if (!message.mentions.has(this.client.user)) return;

    // メンション部分を除去してメッセージ内容を取得
    const content = message.content
      .replace(new RegExp(`<@!?${this.client.user.id}>`, "g"), "")
      .trim();

    // メッセージが空の場合
    if (!content) {
      await message.reply("ウホ？仲間よ、何か話しかけてくれウホ！🦍🍌");
      return;
    }

    try {
      // 入力中インジケーターを表示（sendTypingが使用可能な場合のみ）
      if ("sendTyping" in message.channel) {
        await message.channel.sendTyping();
      }

      // AI応答を生成
      const response = await this.aiService.generateResponse(
        content,
        this.config.bot.maxResponseLength
      );

      // リプライを送信
      await message.reply(response);
    } catch (error) {
      console.error("メッセージ処理エラー:", error);
      await message.reply("ウホホ…ゴリ太郎、つまずいたウホ。もう一回試してウホ！🍌");
    }
  }

  /** BOTを起動 */
  async start(): Promise<void> {
    await this.client.login(this.config.discord.token);
  }

  /** BOTを停止 */
  async stop(): Promise<void> {
    this.client.destroy();
    console.log("BOTを停止しました");
  }
}
