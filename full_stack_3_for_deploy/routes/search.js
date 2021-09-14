const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient
const config = require('../config')

router.get('/', async (req, res) => {
  console.log(req.query)
  
  const code = (req.query.code) ? decodeURIComponent(req.query.code) : ''
  const brand = (req.query.brand) ? decodeURIComponent(req.query.brand) : ''
  const number = (req.query.number) ? decodeURIComponent(req.query.number) : ''
  const titleArray = (req.query.title) ? decodeURIComponent(req.query.title).split(' ') : '' // makes an array of keywords
  const page = (req.query.page) ? decodeURIComponent(req.query.page) : 0
  
  if( code || brand || number || titleArray.length > 0 ) {
    const data = await queryFromMongoDB({ code, brand, number, titleArray, page })
    res.send(data)
  } else {
    res.sendStatus(400)
  }
})

async function queryFromMongoDB({ code, brand, number, titleArray, page }) {
  const client = await MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology: true })

  const arrayOfQueryObjects = []
  if(code) { arrayOfQueryObjects.push({ code: new RegExp(code) }) }
  if(brand) { arrayOfQueryObjects.push({ brand: new RegExp(brand, 'i') }) }
  if(number) { arrayOfQueryObjects.push({ number: new RegExp(number, 'i') }) }
  if(titleArray.length > 0) { titleArray.forEach( el => arrayOfQueryObjects.push({ title: new RegExp(el, 'i') }) )}
  console.log(arrayOfQueryObjects)

  const array = await client.db().collection(config.MONGODB_COLLECTION).find({ $and: arrayOfQueryObjects }).skip(page*config.NUMBER_OF_VALUES_ON_A_PAGE).limit(Number.parseInt(config.NUMBER_OF_VALUES_ON_A_PAGE)).toArray()

  client.close()
  return array
}

module.exports = router