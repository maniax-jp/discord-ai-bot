import { config } from "./config.js";
import { DiscordBot } from "./bot.js";
import { AIService } from "./services/ai.js";

// AIサービスの初期化
const aiService = new AIService(config.gemini.apiKey, config.gemini.model);

// Discord BOTの初期化
const bot = new DiscordBot(config, aiService);

// グレースフルシャットダウン
const shutdown = async () => {
  console.log("\nシャットダウン中...");
  await bot.stop();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// BOT起動
console.log("BOTを起動中...");
bot.start().catch((error) => {
  console.error("BOT起動エラー:", error);
  process.exit(1);
});
