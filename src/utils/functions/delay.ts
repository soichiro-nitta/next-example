export default (duration: number): Promise<void> => {
  return new Promise((resolve): void => {
    setTimeout(resolve, duration * 1000)
  })
}
