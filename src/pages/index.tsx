import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { StateTypes } from '~/store'
import { setName } from '~/store/user'
import Link from 'next/link'
import soichiro from 'soichiro-npm-example'

type ContainerProps = {}
type Props = {
  flag: boolean
  className: string
  handleClick: () => void
} & ContainerProps

const Component: React.FC<Props> = props => (
  <div className={props.className}>
    <button className="btn" onClick={props.handleClick}>
      {props.flag ? 'click me' : 'CLICK ME'}
    </button>
  </div>
)

const StyledComponent = styled(Component)`
  color: blue;
`

const Container: React.FC<ContainerProps> = props => {
  const dispatch = useDispatch()
  dispatch(setName('aaa'))
  const name = useSelector((state: StateTypes) => state.user.name)
  console.log(name)
  soichiro()

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
