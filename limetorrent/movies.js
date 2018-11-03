const cheerio = require('cheerio')
const request = require('request')


const getLemons =(url,res)=>{
    var arrayObject = [];
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        var body = $("tr");
  
        body.each((i, element) => {
          var name = $(element)
            .find("a:nth-child(2)")
            .text();
          var torrent = $(element)
            .find("a:nth-child(1)")
            .attr("href");
          var size = $(element)
            .find("td.tdnormal:nth-child(3)")
            .text();
          var seeds = $(element)
            .find("td.tdseed")
            .text();
          var leeches = $(element)
            .find("td.tdleech")
            .text();
          
          var movies = {
            name,
            torrent,
            size,
            seeds,
            leeches
          }
  
          arrayObject.push(movies)
        });
      var cleanList=[]
       for(let j=5;j<arrayObject.length;j++){
        cleanList.push(arrayObject[j])
       }

       res.send(cleanList)
      }
    });
}

module.exports={ getLemons}