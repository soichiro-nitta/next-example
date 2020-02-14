import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Artboard = dynamic(() => import('~/components/base/artboard'), {
  ssr: false
})

type ContainerProps = { className: string }
type Props = {} & ContainerProps

const Component: React.FC<Props> = props => (
  <div className={props.className}>
    <Artboard className="artboard" />
    <Link href="/">
      <button>to index.tsx</button>
    </Link>
  </div>
)

const StyledComponent = styled(Component)`
  color: red;
`

const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent className="pixi" {...props} />
}

export default Container
