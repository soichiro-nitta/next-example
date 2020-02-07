# 開発環境

EditorConfig, ESLint, Prettierによる記法の統一、自動整形。

tsconfig.jsonは、Nextが生成するものに `paths` と `baseUrl` を追加したものを使用。

要件に応じて.envを導入します。  
https://github.com/motdotla/dotenv#readme

# ステージング環境
Next.js開発元であるZEIT製のZEIT Nowを使用。  
https://zeit.co/

# デプロイ
以下のコマンドを実行後、`out/` ディレクトリにSPAが生成されます。
```
yarn run build && yarn run export
```

# ルーター
Next.jsに備わるDynamic Routingを使用していきます。  
https://nextjs.org/docs/routing/dynamic-routes

`pages/` ディレクトリ配下のファイル名 = URLとなります。

基本的な例

```
pages/index.tsx → localhost:3000/
pages/detail.tsx → localhost:3000/detail
```

動的ルーティングの例

```
pages/post/[pid].js → localhost:3000/post/1
```

以下のように `pid` を取得できます。

```
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post
```


# ステート管理
Redux Toolkitを使用したスタイルを採用。  
Reduxの公式スタイルガイドで、Redux Toolkitの使用が推奨されています。  
https://redux.js.org/style-guide/style-guide/#use-redux-toolkit-for-writing-redux-logic


非同期処理について  
redux-thunkやredux-sagaを用いず、カスタムフックを作成します。  
https://twitter.com/soichiro_nitta/status/1222805828320710662?s=20

Redux DevTools Extension chrome / firefox

# スタイルの実装方法
styled-componentsを使用します。  
カラーやサイズなどの共通化できるものは `utils/styles/` で管理します。  
（styled-componentsのthemingは記述が冗長になるので使用しません。）

グローバルなスタイルは `utils/styles/GlobalStyle.ts` に記述します。

各コンポーネントごとの実装は以下のようにします。

```
import styled from 'styled-components'

const Component = () => (
  <div>
    hoge
    <p>fuga</p>
  </div>
)

const StyledComponent = styled(Component)`
  color: red;
  > p {
    color: blue;
  }
`
```

# コンポーネント設計 / ディレクトリ構成
以下のような5層でコンポーネントを構成します。  
参照：https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
```
// (1) import層
import React from 'react'
import styled from 'styled-components'
// (2) Types層
type ContainerProps = {...}
type Props = {...} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (...)
// (4) Style層
const StyledComponent = styled(Component)`...`
// (5) Container層
const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent {...props} />
}
```

# ディレクトリ構成
`UsersListItem.tsx` といった命名をせずに以下のようにディレクトリを切る構成にします。
スタイルのネストを目安に

また、これが複数のコンポーネントで利用されるタイミングで共通フォルダへ移行します。
参照：https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a#comment-905be26e139a8fb1e9cb

```
Users
├── index.tsx
├── title.tsx
└── list
    ├── index.tsx
    ├── title.tsx
    └── item
        ├── index.tsx
        ├── title.tsx
        ├── avatar.tsx
        └── icon.svg

```

UsersTitleやUsersListという named exportはせずに title listをどんどん使っていく
> を2つまでであれば見通しが良いですが、それ以上深くなった場合、別Component として切り出すべきタイミングとなります。
https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a

# リクエスト部分のモジュール化、まとめ方
	リクエスト用のモジュールを作成
	axiosを直接使わずにリクエストだけを行うモジュールを、$axiosと同じようなインターフェースで実装する
	（今後 sindresorhus/ky に乗り換えたい！となったとしても同じインターフェースを実装すれば交換できる）

	エンドポイントの関数化
	エンドポイントごとに関数化して、関数ごとにファイルをわける。
	1ファイル1関数1export
	（パスが一緒でもMethodが異なれば別の関数にする）
	名前をつけることで、パスやMethodを見なくても何をするものか推測できるようになる
	既存コードを読む負担の軽減
	APIに関するコードの一貫性向上
	APIの変更にも強い
	https://slides.com/nakajmg/replace-axios-module/#/17

utils/config utils/functions utils/request utils/styles 
