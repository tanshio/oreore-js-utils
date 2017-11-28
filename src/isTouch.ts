/**
 * Check Touch Device
 * @returns {boolean}
 */
export default () => {
  const ua: string = navigator.userAgent
  return (/Android|iPhone|iPod|iPad/.test(ua))
}
