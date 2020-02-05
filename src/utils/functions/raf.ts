export default (): Promise<void> => {
  return new Promise((resolve): void => {
    requestAnimationFrame((): void => {
      resolve()
    })
  })
}
