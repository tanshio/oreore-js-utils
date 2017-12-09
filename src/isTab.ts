/**
 * Check Tablet Device
 * @returns {boolean}
 */
export const isTab = () => {
  const ua: string = navigator.userAgent
  return (ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') === -1))
}
