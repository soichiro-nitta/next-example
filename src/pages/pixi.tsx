// (1) import層
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
// (2) Types層
type ContainerProps = {}
type Props = {
  className: string
} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (
  <div className={props.className}>
    pixi.tsx
    <Link href="/">to index.tsx</Link>
  </div>
)
// (4) Style層
const StyledComponent = styled(Component)`
  color: red;
`
// (5) Container層
const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent {...props} className="pixi" />
}

export default Container
