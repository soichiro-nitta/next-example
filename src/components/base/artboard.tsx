import React from 'react'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'

type ContainerProps = { className: string }
type Props = {
  appendOld: () => void
  appendNew: () => void
  removeOld: () => void
  removeNew: () => void
  addGraphic: () => void
} & ContainerProps

const Component: React.FC<Props> = props => (
  <div className={props.className}>
    <div className="old">old</div>
    <br />
    <div className="new">new</div>
    <br />
    <button onClick={props.appendOld}>appnedOld</button>
    <button onClick={props.appendNew}>appnedNew</button>
    <button onClick={props.removeOld}>removeOld</button>
    <button onClick={props.removeNew}>removeNew</button>
    <button onClick={props.addGraphic}>addGraphic</button>
  </div>
)

const StyledComponent = styled(Component)`
  padding: 30px;
  width: 100%;
  background: gray;
  > button {
    margin-right: 10px;
  }
`

const Container: React.FC<ContainerProps> = props => {
  const app = new PIXI.Application()

  const appendOld = (): void => {
    const element = document.getElementsByClassName('old')[0]
    if (element) {
      alert('クラスネームoldの子要素にcanvasを生成します')
      element.appendChild(app.view)
    } else {
      alert('クラスネームoldの要素は除去されています')
    }
  }
  const appendNew = (): void => {
    const element = document.getElementsByClassName('new')[0]
    if (element) {
      alert('クラスネームnewの子要素にcanvasを生成します')
      element.appendChild(app.view)
    } else {
      alert('クラスネームnewの要素は除去されています')
    }
  }
  const removeOld = (): void => {
    alert('クラスネームoldの要素を除去します')
    const element = document.getElementsByClassName('old')[0]
    element.parentNode?.removeChild(element)
  }
  const removeNew = (): void => {
    alert('クラスネームnewの要素を除去します')
    const element = document.getElementsByClassName('new')[0]
    element.parentNode?.removeChild(element)
  }
  const addGraphics = (): void => {
    alert('PIXIのインスタンスにgraphicsを追加します')
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xde3249)
    graphics.drawRect(50, 50, 100, 100)
    graphics.endFill()
    app.stage.addChild(graphics)
  }

  return (
    <StyledComponent
      appendOld={appendOld}
      appendNew={appendNew}
      removeOld={removeOld}
      removeNew={removeNew}
      addGraphic={addGraphics}
      {...props}
    />
  )
}

export default Container
