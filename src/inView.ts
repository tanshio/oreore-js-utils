import polyfill from 'dynamic-polyfill'

class InView {

  private selector: string

  constructor (selector) {
    this.selector = selector
    console.log(this.selector)
  }

  public init () {
    const handler = this.scroll.bind(this)

    polyfill({
      fills: ['IntersectionObserver'],
      options: ['gated'],
      minify: true,
      rum: false,
      afterFill () {
        handler()
      }
    })
  }

  public enter () {
    console.log('enter')
  }

  public leave () {
    console.log('leave')
  }

  public callback (entries) {
    console.log(entries)
    for (const e of entries) {
      if (e.isIntersecting) {
        console.log(e)
        this.enter()
      } else {
        this.leave()
      }
    }
  }

  public scroll () {
    const observer = new IntersectionObserver(this.callback.bind(this))

    const list: NodeListOf<HTMLElement> = document.querySelectorAll(this.selector)

    if (list.length > 0) {
      Array.from(list).forEach((e) => {
        observer.observe(e)
      })
    } else {
      console.log('no')
    }
  }
}

export default InView
