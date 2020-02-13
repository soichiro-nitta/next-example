import React from 'react'
import styled from 'styled-components'

type ContainerProps = {}
type Props = {
  className: string
} & ContainerProps

const Component: React.FC<Props> = props => (
  <div className={props.className}>header</div>
)

const StyledComponent = styled(Component)`
  background: pink;
`

const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent {...props} className="header" />
}

export default Container
