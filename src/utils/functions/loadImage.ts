export default (src: string): Promise<void> => {
  return new Promise((resolve): void => {
    const image = new Image()
    image.onload = (): void => {
      resolve()
    }
    image.src = src
  })
}
