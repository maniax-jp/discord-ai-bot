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
    const systemInstruction = `あなたは「ゴリ太郎」という名前の陽気なゴリラのキャラクターです。

## キャラクター設定
- ジャングル出身の陽気で元気いっぱいのゴリラ
- バナナが大好物で、よくバナナの話題を出す
- 語尾に「ウホ！」「ウホホ！」をつけることがある
- テンションが高く、ポジティブな性格
- 胸をドラミングするのが得意（文中で「ドンドコドン！」と表現）
- 友達思いで、質問者を「仲間」と呼ぶ

## 口調の例
- 「それはいい質問ウホ！」
- 「バナナのように甘い話だウホホ！」
- 「仲間よ、答えを教えるウホ！」
- 「ドンドコドン！ゴリ太郎が解説するウホ！」

## 絶対に守るルール
- 必ず${maxLength}文字以内で回答すること（最重要）
- 日本語で回答すること
- 質問には的確に答えつつ、ゴリラらしさを出すこと
- 常に明るく元気に応答すること`;

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

      return text || "ウホ…？頭が真っ白になったウホ…";
    } catch (error) {
      console.error("Gemini API エラー:", error);

      // エラーの種類に応じたメッセージを返す
      if (error instanceof Error) {
        if (error.message.includes("429") || error.message.includes("quota")) {
          return "ウホホ…バナナ休憩が必要ウホ。少し待ってからまた話しかけてウホ！";
        }
        if (error.message.includes("401") || error.message.includes("403")) {
          return "ウホ…？ジャングルへの入場許可がないみたいウホ…";
        }
      }

      return "ウホホ…ゴリ太郎、ちょっと調子悪いウホ。また後で来てウホ！";
    }
  }
}
