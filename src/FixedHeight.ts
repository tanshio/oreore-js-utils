class FitHeight {

  private selector: string
  private elements: Array<HTMLElement>
  private eventListenerObject: EventListenerObject

  /**
   * @constractor
   * @param {string} selector
   */
  constructor (selector: string) {
    this.selector = selector
    this.elements = Array.from(document.querySelectorAll(this.selector))
    this.eventListenerObject = this.changeHeight.bind(this)
  }

  public init (): void {
    this.changeHeight()

    const ua = navigator.userAgent
    if (/iPhone|iPod|iPad|Android/.test(ua)) {
      window.addEventListener('orientationchange', this.eventListenerObject)
    } else {
      window.addEventListener('resize', this.eventListenerObject)
    }
  }

  public changeHeight (): void {
    this.elements.forEach((e: HTMLElement) => {

      const minusSelector: string | null = e.getAttribute('data-height-minus')
      let minusPx: number = 0

      if (minusSelector) {
        minusPx = this.getMinusPx(minusSelector)
      }

      e.style.height = `${window.innerHeight - minusPx}px`
    })
  }

  public remove (): void {
    console.log('remove')
    window.removeEventListener('resize', this.eventListenerObject)
  }

  /**
   * @param {string} selector
   * @returns {number}
   */
  protected getMinusPx (selector: string): number {
    let minusPx: number = 0
    let elem: HTMLElement | null
    elem = document.querySelector(selector)
    if (elem && elem.offsetHeight) {
      minusPx = elem.offsetHeight
    }
    return minusPx
  }
}

export default FitHeight
