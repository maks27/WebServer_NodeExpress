/* eslint-disable quote-props */

class Weather {
  constructor (text) {
    this.text = this.check(text)
  }

  check (text) {
    if (text.length === 0) return []
    else return JSON.parse(text)
  }

  getall () {
    return JSON.stringify(this.text)
  }

  get (params) {
    return this.text.filter(result => result.location === params)
  }

  post (location, temp, humidity, pressure) {
    if (this.isExist(location)) {
      const index = this.text.findIndex(result => result.location === location)
      this.text[index] = ({ 'location': location, 'temperature': temp, 'humidity': humidity, 'pressure': pressure })
      return JSON.stringify(this.text)
    } else {
      this.text.push({ 'location': location, 'temperature': temp, 'humidity': humidity, 'pressure': pressure })
      return JSON.stringify(this.text)
    }
  }

  validateData (location, temp, humidity, pressure) {
    const locationtest = /^[a-zA-Z\s]*$/
    const temptest = /^-?(\d{1,2})(,\d*)?$/
    const humiditytest = /^[1-9][0-9]?$|^100$/
    const pressuretest = /^[8-9][0-9][0-9]$|^1[0-1][0-9][0-9]$/
    if (!locationtest.test(location)) return false
    if (!temptest.test(temp)) return false
    if (!humiditytest.test(humidity)) return false
    if (!pressuretest.test(pressure)) return false
    return true
  }

  deleteData (location) {
    const index = this.text.findIndex(result => result.location === location)
    this.text.splice(index, 1)
    return JSON.stringify(this.text)
  }

  isExist (value) {
    return this.text.some(result => result.location === value)
  }
}

module.exports = Weather
