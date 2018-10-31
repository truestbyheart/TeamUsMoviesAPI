const express = require('express')
const cheerio = require('cheerio')
const request = require('request')

const today = require('./todaytvseries')
const asian = require('./koreantvseries')
const {
  getMovies
} = require('./1337x.to/movies')
const {sortRequest} =require('./filters/1337x.to')


const app = express()
const port = process.env.port || 3000

const router = express.Router()

app.listen(port)


// this is the app itself for now

router.get('/todaytvseries/:seriesName', (req, res) => {
  var seriesName = req.params.seriesName

  request('http://www.todaytvseries2.com/search-series?searchword=' + seriesName + '&searchphrase=all',
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        var content = $('.content2').find('a').attr('href')
        today.ep(content, res)

      }
    })

})

router.get('/koreandrama/:dramaName', (req, res) => {
  var dramaName = req.params.dramaName

  var url = 'https://dramamate.net/?s=' + dramaName
  request(url,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {

        const $ = cheerio.load(html);
        var content = $('.title').find('a').attr('href')
        console.log(content)
        asian.getEpisodes(content, res)


      } else {
        console.log('failed')
      }

    })
})

router.get('/1337x.to/movies/name=:title', (req, res) => {
  var title = req.params.title
  var page = req.query.page
  var sort = req.query.sort

  if (!page && !sort) {
    var url = 'https://1337x.to/category-search/' + title + '/Movies/1/'
    getMovies(url, res)
  } else if (page && !sort) {
    var url = 'https://1337x.to/category-search/' + title + '/Movies/' + page + '/'
    getMovies(url, res)
  } else if (!page && sort) {
    var data = {title,sort,page:1}
    sortRequest(data,res)
  }else if(page && sort){

  }






  //https://1337x.to/category-search/the%20meg/Movies/1/


})


app.use('/', router)

