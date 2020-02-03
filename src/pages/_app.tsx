import * as React from 'react'
import { Provider } from 'react-redux'
import store from '~/store'
import { AppProps } from 'next/app'

type AppTypes = (props: AppProps) => React.ReactElement

const App: AppTypes = ({ Component, pageProps }) => (
  <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
)

export default App
