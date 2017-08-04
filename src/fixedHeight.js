import isTouch from './isTouch.js'

/**
 * [fixedHeight description]
 * @param  {[type]} $elems [description]
 */
const fixedHeight = ($elems) => {
  const vh = window.innerHeight
  [...document.querySelectorAll($elems)].forEach(($elem) => {
    $elem.style.height = `${vh}px`
  })
}

/**
 * [description]
 * @param  {[type]} $elems [description]
 */
export default ($elems)=> {
  if(!document.querySelectorAll($elems).length > 0) {
    return false
  }

  window.addEventListener('load', fixedHeight($elems))

  if (isTouch()) {
    window.addEventListener('orientationchange', fixedHeight($elems))
  }else {
    window.addEventListener('resize', fixedHeight($elems))
  }
}
