const cheerio = require('cheerio')
const request = require('request')

var magnet

const getMagnet = (href) => {
  var url = 'https://1337x.to' + href

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      magnet = $('.download-links-dontblock li').find('a').attr('href')
      hash = $('.infohash-box').find('p').text()

      var data = {
        magnet,
        hash
      }
      console.log(data)
      return data
    }

  })


}


module.exports = {
  getMagnet
}