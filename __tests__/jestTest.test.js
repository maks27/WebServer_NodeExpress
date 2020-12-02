const wClass = require('../weatherClass.js')
const request = require('supertest')
const { obj, app, fs } = require('../index.js')
const sendData = {
  location: "Nowy Jork",
  temperature: "23",
  humidity: "70",
  pressure: "1000"
}

//Example tests


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})


describe('ifExist', () => {
  it('is Warsaw city Exists ?', () => {
    const check = obj.isExist("1234Rwas");
    expect(check).toBe(false)
  })
})

//Main tests


describe('Post and save data to JSON', () => {
  const tempdata = {
    location: "Nowy Jork",
    temperature: "20",
    humidity: "75",
    pressure: "990"
  }
  let index = 0;
  it('Is post response', async () => {
    await request(app).post("/")
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .send(tempdata)
      .expect(200)
  })
  it('Is save data to JSON', () => {
    let file = (JSON.parse(fs.readFileSync('weather.json')))
    index = file.findIndex(result => result.location === tempdata.location)
    expect(file).toContainEqual(tempdata)
  })
  it('If post change data', async () => {
    await request(app).post("/")
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .send(sendData)
      .expect(200)
  })
  it('If save data changes to JSON in the same index', () => {
    let file = (JSON.parse(fs.readFileSync('weather.json')))
    index2 = file.findIndex(result => result.location === tempdata.location)
    expect(index2).toEqual(index)
    expect(file).toContainEqual(sendData)
    console.log(file)
  })
  it('If get response', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
  })

})


describe('Get', () => {
  it('If get response', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
  })
})


describe('Delete and delete data from JSON', () => {

  it('If delete response', async () => {
    await request(app).delete("/")
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .send(sendData)
      .expect(200)
  })

  it('If delete data from JSON', () => {
    let file = (JSON.parse(fs.readFileSync('weather.json')))
    expect(file).not.toContainEqual(sendData)
  })

})