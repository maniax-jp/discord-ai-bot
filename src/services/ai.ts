import { GoogleGenAI } from "@google/genai";

/** AIサービス - Gemini APIとの通信を担当 */
export class AIService {
  private ai: GoogleGenAI;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.ai = new GoogleGenAI({ apiKey });
    this.model = model;
  }

  /**
   * ユーザーのメッセージに対してAI応答を生成する
   * @param userMessage ユーザーからのメッセージ
   * @param maxLength 応答の最大文字数
   * @returns AI応答テキスト
   */
  async generateResponse(
    userMessage: string,
    maxLength: number
  ): Promise<string> {
    const systemInstruction = `あなたは親切で知識豊富なアシスタントです。
以下のルールを厳守してください：
- 必ず${maxLength}文字以内で簡潔に回答すること
- 日本語で回答すること
- 質問に対して的確に答えること`;

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      let text = response.text ?? "";

      // 万が一文字数制限を超えた場合はトリミング
      if (text.length > maxLength) {
        text = text.substring(0, maxLength - 1) + "…";
      }

      return text || "応答を生成できませんでした。";
    } catch (error) {
      console.error("Gemini API エラー:", error);

      // エラーの種類に応じたメッセージを返す
      if (error instanceof Error) {
        if (error.message.includes("429") || error.message.includes("quota")) {
          return "申し訳ありません。しばらく待ってからもう一度お試しください。";
        }
        if (error.message.includes("401") || error.message.includes("403")) {
          return "APIの認証に問題が発生しました。";
        }
      }

      return "申し訳ありません。現在応答を生成できません。";
    }
  }
}
