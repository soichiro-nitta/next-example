import * as React from 'react'
import { Provider } from 'react-redux'
import store from '~/store'
import { AppProps } from 'next/app'
import { GlobalStyle } from '~/utils/styles'
import Header from '~/components/_app/header'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <>
    <GlobalStyle />
    <Header />
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
)

export default App
