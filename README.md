# Discord AIチャットボット

Discord上で動作するAIチャットボットです。BOTにメンションすると、Google Gemini APIを使用して140文字以内で回答します。

## 機能

- BOTへのメンションに対してAIが応答
- 140文字以内の簡潔な回答
- 日本語対応

## 必要なもの

- Node.js 18以上
- Discord BOTトークン
- Google Gemini APIキー（無料）

## セットアップ

### 1. Discord BOTの作成

1. [Discord Developer Portal](https://discord.com/developers/applications) にアクセス
2. 「New Application」でアプリケーションを作成
3. 「Bot」セクションで「Reset Token」をクリックしてトークンを取得
4. 「Privileged Gateway Intents」で **Message Content Intent** を有効化

### 2. Gemini APIキーの取得

1. [Google AI Studio](https://aistudio.google.com/apikey) にアクセス
2. 「Create API Key」でAPIキーを作成

### 3. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを編集:

```
DISCORD_TOKEN=your_discord_bot_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. 依存関係のインストール

```bash
npm install
```

### 5. BOTをサーバーに招待

1. Discord Developer Portalの「OAuth2」→「URL Generator」
2. 「Scopes」で `bot` を選択
3. 「Bot Permissions」で以下を選択:
   - Send Messages
   - Read Message History
4. 生成されたURLでBOTをサーバーに招待

## 起動方法

### 開発モード

```bash
npm run dev
```

### 本番モード

```bash
npm run build
npm start
```

## 使い方

Discordで `@BOT名 質問内容` と送信すると、AIが140文字以内で回答します。

例:
- `@BOT名 こんにちは`
- `@BOT名 TypeScriptとは何ですか？`

## コマンド一覧

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発モードで起動 |
| `npm run build` | TypeScriptをコンパイル |
| `npm start` | 本番モードで起動 |
| `npm run typecheck` | 型チェック |

## 技術スタック

- TypeScript
- discord.js
- Google Gemini API (@google/genai)
