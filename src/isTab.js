export default () => {
  const ua = navigator.userAgent
  if (ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') === -1)) {
    return true
  }
  return false
}
