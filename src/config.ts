import "dotenv/config";

/** アプリケーション設定の型定義 */
export interface Config {
  discord: {
    token: string;
  };
  gemini: {
    apiKey: string;
    model: string;
  };
  bot: {
    /** 応答の最大文字数 */
    maxResponseLength: number;
  };
}

/**
 * 環境変数から設定を読み込み、バリデーションを行う
 */
function loadConfig(): Config {
  const discordToken = process.env.DISCORD_TOKEN;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  // 必須環境変数のバリデーション
  if (!discordToken) {
    throw new Error("環境変数 DISCORD_TOKEN が設定されていません");
  }

  if (!geminiApiKey) {
    throw new Error("環境変数 GEMINI_API_KEY が設定されていません");
  }

  return {
    discord: {
      token: discordToken,
    },
    gemini: {
      apiKey: geminiApiKey,
      model: geminiModel,
    },
    bot: {
      maxResponseLength: 140,
    },
  };
}

export const config = loadConfig();
