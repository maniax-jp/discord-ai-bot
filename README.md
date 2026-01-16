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

## OS起動時の自動起動設定

### systemdサービスとして登録（Linux）

1. サービスファイルを作成:

```bash
sudo nano /etc/systemd/system/discord-ai-bot.service
```

2. 以下の内容を記述（パスは環境に合わせて変更）:

```ini
[Unit]
Description=Discord AI ChatBot
After=network.target

[Service]
Type=simple
User=maniax
WorkingDirectory=/home/maniax/dev/discord-ai-bot
ExecStart=/home/maniax/.nvm/versions/node/v24.13.0/bin/node /home/maniax/dev/discord-ai-bot/dist/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

3. サービスを有効化して起動:

```bash
# サービスを有効化（OS起動時に自動起動）
sudo systemctl enable discord-ai-bot

# サービスを開始
sudo systemctl start discord-ai-bot

# ステータス確認
sudo systemctl status discord-ai-bot

# ログ確認
sudo journalctl -u discord-ai-bot -f
```

4. サービスの管理コマンド:

```bash
# サービスを停止
sudo systemctl stop discord-ai-bot

# サービスを再起動
sudo systemctl restart discord-ai-bot

# 自動起動を無効化
sudo systemctl disable discord-ai-bot
```

**注意事項:**
- `User`、`WorkingDirectory`、`ExecStart`のパスは環境に合わせて変更してください
- nvmを使用している場合、Node.jsの正確なパスを指定する必要があります（`which node`で確認）
- `.env`ファイルがプロジェクトディレクトリに存在することを確認してください

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
