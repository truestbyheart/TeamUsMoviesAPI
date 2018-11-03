const cheerio = require('cheerio')
const request = require('request')

 function getMagnet (movie) {

  var g =[]
  return new Promise((resolve,reject)=>{ 
    for(let j=1;j<movie.length;j++){
      var url = 'https://1337x.to' + movie[j].href
    
      request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html)
          magnet = $('.download-links-dontblock li').find('a').attr('href')
          hash = $('.infohash-box').find('span').text()
       
         var newSeed = movie[j].seeds
         var newSize = movie[j].size
         var newName = movie[j].name
         var newLeeches = movie[j].leeches
          var data = {
            name:newName,
            seed:newSeed,
            leeches:newLeeches,
            size:newSize,
            magnet,
            hash
          }
        g.push(data)
        resolve(g)
        }
      })
      
    }
  
   
  
   
  })
   
  


  
}





module.exports = {
  getMagnet
}