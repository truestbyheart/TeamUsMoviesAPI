const cheerio = require('cheerio')
const request = require('request')

const {
  getMagnet
} = require('./helpers/getMagnet')

const getMovies = (url, res) => {
  var movies = []

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      var body = $('tr')

      body.each((i, element) => {
        var name = $(element).find('.name').text()
        var href = $(element).find('.name a:nth-child(2)').attr('href')
        var seeds = $(element).find('.seeds:nth-child(1)').text()
        var leeches = $(element).find('.leeches').text()
        var size = $(element).find('.size').text()
        var movie = {
          name,
          seeds,
          leeches,
          size
        }
// temporary solution
     getMagnet(href,movie,res)
     .then((movie)=>{
      movies.push(movie)
      setTimeout(()=>{
        res.send({movies})
      },2000)
     })
     .catch((e)=>res.status(401).send())

     
      })
      console.log(movies)
    }
    
  })
  
}

module.exports = {
  getMovies
}
