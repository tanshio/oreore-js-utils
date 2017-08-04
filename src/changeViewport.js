/**
 * [description]
 * @param  {Number} [size=1024] [description]
 */
export default (size = 1024)=> {
  const ua = navigator.userAgent;
  const _viewport = document.createElement('meta');
  const $head = document.querySelector('head');
  _viewport.setAttribute('name','viewport');
  if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
    _viewport.setAttribute('content','width=device-width, initial-scale=1');
  }else{
    _viewport.setAttribute('content',`width=${size}`);
  }
  $head.appendChild(_viewport);
}
