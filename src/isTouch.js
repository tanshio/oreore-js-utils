/**
 * [description]
 * @return {[Bool]} [description]
 */
export default () => {
  const ua = navigator.userAgent
  if (/Android|iPhone|iPod|iPad/.test(ua)) {
    return true
  }
  return false
}
