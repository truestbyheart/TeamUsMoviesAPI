const cheerio = require('cheerio')
const request = require('request')

 function getMagnet (href,movie,res) {
  
  var url = 'https://1337x.to' + href

  return new Promise((resolve,reject)=>{
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)
        magnet = $('.download-links-dontblock li').find('a').attr('href')
        hash = $('.infohash-box').find('span').text()
  
        var data = {
          magnet,
          hash
        }
  
        movie.magnet=data

        resolve(movie)
        
  
      }
    })
  })

  
}





module.exports = {
  getMagnet
}