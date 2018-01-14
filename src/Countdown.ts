import differenceInMonths from 'date-fns/difference_in_months'

export class Countdown {

  public startDate: number
  public endDate: number
  private DAY: number = 24 * 60 * 60 * 1000

  /**
   * constructor
   * @param {Date} startDate
   * @param {Date} endDate
   */
  constructor (startDate: number = Date.now(), endDate: string) {
    this.startDate = startDate
    this.endDate = Date.parse(endDate)
  }

  public getOriginMillisecond (): number {
    return this.endDate - this.startDate
  }

  public getSecond (): number {
    return Math.floor((this.getOriginMillisecond() % this.DAY) / 1000) % 60 % 60
  }

  public getMinute (): number {
    return Math.floor((this.getOriginMillisecond() % this.DAY) / (60 * 1000)) % 60
  }

  public getHour (): number {
    return Math.floor((this.getOriginMillisecond() % this.DAY) / (60 * 60 * 1000))
  }

  public getDay (): number {
    return Math.floor(this.getOriginMillisecond() / this.DAY)
  }

  public getWeek (): number {
    return Math.floor(this.getDay() % 7)
  }

  public getOriginMonth (): number {
    const month = differenceInMonths(
      new Date(this.endDate),
      new Date(this.startDate)
    )
    return month
  }

  public getMonth (): number {
    return this.getOriginMonth() % 12
  }

  public getYear (): number {
    return Math.floor(this.getMonth() / 12)
  }
}
