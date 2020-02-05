import GlobalStyle from './GlobalStyle'
import colors from './colors'
import mixins from './mixins'
import sizes from './sizes'
import { css, FlattenSimpleInterpolation } from 'styled-components'

export { GlobalStyle }

const large = (
  style: FlattenSimpleInterpolation
): FlattenSimpleInterpolation => {
  return css`
    @media (min-width: ${sizes.mq.large}px) {
      ${style}
    }
  `
}

export default {
  colors,
  mixins,
  sizes,
  large
}
