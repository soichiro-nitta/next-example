import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
let PIXI: any
if (typeof window !== `undefined`) {
  PIXI = require('pixi.js')
}

type ContainerProps = {}
type Props = {
  className: string
} & ContainerProps

const Component: React.FC<Props> = props => (
  <div className={props.className}>
    pixi.tsx
    <Link href="/">
      <a>to index.tsx</a>
    </Link>
    <Link href="/post/2">
      <a>to post 2</a>
    </Link>
  </div>
)

const StyledComponent = styled(Component)`
  color: red;
`

const Container: React.FC<ContainerProps> = props => {
  React.useEffect(() => {
    const app = new PIXI.Application()
    document.body.appendChild(app.view)
  }, [])

  return <StyledComponent {...props} className="pixi" />
}

export default Container
