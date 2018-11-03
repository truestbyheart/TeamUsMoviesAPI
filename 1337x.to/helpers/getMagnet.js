const cheerio = require('cheerio')
const request = require('request')

 function getMagnet (movie,res) {

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
       // console.log(data)
        g.push(data)
        resolve(g)
        }
      })
      
    }
  
    //resolve(g)
   
  
   
  })
   
  


  
}





module.exports = {
  getMagnet
}

// var url = 'https://1337x.to' + href
//   request(url, (error, response, html) => {
//     if (!error && response.statusCode === 200) {
//       const $ = cheerio.load(html)
//       magnet = $('.download-links-dontblock li').find('a').attr('href')
//       hash = $('.infohash-box').find('span').text()

//       var data = {
//         magnet,
//         hash
//       }

//       movie.magnet=data
      
//       return JSON.stringify(movie)
      

//     }
//   })