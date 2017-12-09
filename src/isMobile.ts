/**
 * Check Mobile Device
 * @returns {boolean}
 */
export const isMobile = () => {
  const ua: string = navigator.userAgent
  return (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0)
}
