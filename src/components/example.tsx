// (1) import層
import React from 'react'
import styled from 'styled-components'
// (2) Types層
type ContainerProps = {}
type Props = {
  flag: boolean
  className: string
  handleClick: () => void
} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => {
  return (
    <div className={props.className}>
      test
      <button className="btn" onClick={props.handleClick}>
        {props.flag ? 'click me' : 'CLICK ME'}
      </button>
    </div>
  )
}
// (4) Style層
const StyledComponent = styled(Component)`
  color: blue;
  .btn {
    color: blue;
  }
  > button {
    color: blue;
  }
`
// (5) Container層
const Container: React.FC<ContainerProps> = props => {
  const [flag, setFlag] = React.useState(false)
  const handleClick = React.useCallback(() => {
    setFlag(!flag)
  }, [flag])
  return (
    <StyledComponent
      {...props}
      flag={flag}
      className="test"
      handleClick={handleClick}
    />
  )
}

export default Container
