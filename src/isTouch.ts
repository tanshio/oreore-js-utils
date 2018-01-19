/**
 * Check Touch Device
 * @returns {boolean}
 */
export default function () {
  const ua: string = navigator.userAgent
  return (/Android|iPhone|iPod|iPad/.test(ua))
}
