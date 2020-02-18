import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

type ContainerProps = { className: string }
type Props = {} & ContainerProps

const Component: React.FC<Props> = props => (
  <div className={props.className}>
    <Link href="/blog/[pid]" as={`/blog/1`}>
      <a>to blog 1</a>
    </Link>
  </div>
)

const StyledComponent = styled(Component)`
  color: red;
`

const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent className="blog" {...props} />
}

export default Container
