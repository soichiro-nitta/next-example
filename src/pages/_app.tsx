import * as React from 'react'
import { Provider } from 'react-redux'
import store from '~/store'
import { AppProps } from 'next/app'
import { GlobalStyle } from '~/utils/styles'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
)

export default App
