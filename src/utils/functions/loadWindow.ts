export default (window: Window): Promise<void> => {
  return new Promise((resolve): void => {
    window.onload = (): void => {
      resolve()
    }
  })
}
