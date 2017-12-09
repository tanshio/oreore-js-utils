/**
 * Check Touch Device
 * @returns {boolean}
 */
export const isTouch = () => {
  const ua: string = navigator.userAgent
  return (/Android|iPhone|iPod|iPad/.test(ua))
}
