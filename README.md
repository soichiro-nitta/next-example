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

```typescript
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
カラーやサイズなどの共通化できるものは `src/utils/styles/` で管理します。  
（styled-componentsのthemingは記述が冗長になるので使用しません。）

グローバルなスタイルは `src/utils/styles/GlobalStyle.ts` に記述します。

各コンポーネントごとのスタイルは以下のようにします。

```typescript
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

```typescript
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

Style層で `>` が2つまでであれば見通しが良いですが、  
それ以上深くなる場合は、別コンポーネントとして切り出すべきタイミングとなります。

```typescript
const StyledComponent = styled(Component)`
> * > * > button {...}
`
```
↑ `>` が3つ続いているため、このあたりで切り出す目安とします。

参照：https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a

# ディレクトリ構成

`UsersListItem.tsx` といった命名はせずに、  
`users/list/item/index.tsx` のようにディレクトリを切る構成にします。  

参照：https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a#comment-905be26e139a8fb1e9cb

```
users
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

Vue.jsスタイルガイドにあるルールを参考にしますが、  
上述のとおりパスカルケースやケバブケースは用いずにディレクトリを切ってしまう方針です。

参照：基底コンポーネントの名前  
https://jp.vuejs.org/v2/style-guide/#%E5%9F%BA%E5%BA%95%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%90%8D%E5%89%8D-%E5%BC%B7%E3%81%8F%E6%8E%A8%E5%A5%A8

参照：密結合コンポーネントの名前  
https://jp.vuejs.org/v2/style-guide/#%E5%AF%86%E7%B5%90%E5%90%88%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E5%90%8D%E5%89%8D-%E5%BC%B7%E3%81%8F%E6%8E%A8%E5%A5%A8

# 非同期通信

axiosを用いて非同期通信をおこないますが、  
ラップしたリクエストを担うモジュールを、`src/utils/request/` に実装しています。
（今後、axios以外に乗り換えたい！となったとしても同じインターフェースを実装すれば交換できる構成としています。）

# エンドポイントの関数化

`src/api/` フォルダ配下で、エンドポイントごとに関数化したファイルを管理し、  
APIに関するコードの一貫性向上、APIの変更に備えます。

```typescript
// src/api/getUserData.js
import request from '~/utils/request'
 
function getUserData({ userId }) {
  const path = `/users/${userId}`
  return request.get(path)
}
 
export default getUserData
```

```typescript
// src/api/updateUserData.js
import request from '~/utils/request'
 
function updateUserData({ userId, data }) {
  const path = `/users/${userId}`
  return request.put(path, { data })
}
 
export default updateUserData
```

1ファイル1関数1export。（パスが一緒でもMethodが異なれば別の関数にします。）

名前をつけることで、パスやMethodを見なくても何をするものか推測しやすくなります。
また、TypeScriptによるエディタの補完が効くようになります。

参照：https://slides.com/nakajmg/replace-axios-module/#/
