# さかなローマ字クイズ：Androidアプリ化の手順

このフォルダは、`FishRomajiQuiz.jsx` を Android アプリにするための一式です。
Android プロジェクト（`android/`）は作成済みです。タブレットに入れるデバッグ用 APK は `apk/sakana-romaji-quiz-debug.apk` にあります（アプリID `jp.example.sakanaromaji`、表示名「さかなローマ字クイズ」）。
ゲームの記録（コイン・ミス回数など）は、アプリ内に保存されるようにしてあります（`USE_LOCAL_STORAGE = true`）。

## 先に準備するもの（パソコンで作業します）

- Node.js 18 以上（https://nodejs.org）
- Android Studio（https://developer.android.com/studio）と、それに付いてくる JDK 17

## 方法A：APKを作って、塾のタブレットに入れる（おすすめ）

```bash
# 1. このフォルダで、部品をインストール
npm install

# 2. 画面（Web版）をビルド
npm run build

# 3. Androidプロジェクトを作成（最初の1回だけ）
npx cap add android

# 4. ビルドした画面を Android に反映
npx cap sync android

# 5. Android Studio を開く
npx cap open android
```

Android Studio が開いたら、メニューの **Build → Build Bundle(s) / APK(s) → Build APK(s)** を選びます。
できあがった `app-debug.apk` を、タブレットにコピーして開くとインストールできます
（「提供元不明のアプリ」を許可する設定が必要です）。

画面やデータを変更したあとは、`npm run android:sync` を実行してから、もう一度ビルドしてください。

### アイコンを自分たちの魚に差し替える（任意）

`assets` フォルダに用意したアイコンを、Androidに反映できます。

```bash
npm install -D @capacitor/assets
npx capacitor-assets generate --android
```

## 方法B：ホーム画面に追加する（アプリストア不要・いちばん手軽）

`npm run build` でできる `dist` フォルダを、Netlify や GitHub Pages などの
https で公開できる場所に置きます。
Android の Chrome でそのアドレスを開き、メニューの **「ホーム画面に追加」**（または「アプリをインストール」）を選ぶと、
全画面のアプリとして起動できます。一度開けば、オフラインでも遊べます。

## パソコンで動作を試すだけなら

```bash
npm install
npm run dev
```

## 運用の前にご確認ください

- **管理者パスワード**：`src/FishRomajiQuiz.jsx` の先頭の `ADMIN_PASSWORD`（初期値 0000）は、アプリの中身に平文で入ります。塾で使うときは変更をおすすめします。
- **記録はタブレットごと**：コインや学習データは、そのタブレットの中だけに保存されます。生徒ごとに分けたいときは、タブレットを分けてください。
- **アプリを消すと記録も消えます**：アンインストールやデータ消去で、コインとミス回数も消えます。
- **Google Play で公開する場合**：署名つきの AAB のビルドと、Google Play デベロッパー登録（有料）が別途必要です。塾内での配布だけなら、APKで十分です。
