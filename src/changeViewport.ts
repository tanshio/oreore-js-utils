import isMobile from './isMobile'

/**
 * [description]
 * @param  {Number} [size=1024] [description]
 */
export default (size = 1024) => {
  const _viewport: HTMLElement = document.createElement('meta')
  const $head: HTMLElement | null = document.querySelector('head')
  _viewport.setAttribute('name','viewport')

  if (isMobile()) {
    _viewport.setAttribute('content','width=device-width, initial-scale=1')
  } else {
    _viewport.setAttribute('content',`width=${size}`)
  }

  if ($head) {
    $head.appendChild(_viewport)
  }
}
