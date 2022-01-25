export const TEST_CONFIGURATIONS = {
  apiContext: fn => ({
    api: window.__ENV.REACT_APP_API,
    setApi: fn
  })
}
