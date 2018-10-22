const request = require('request')
const cheerio = require('cheerio')

var getEpisodes = (content,res) =>{
   var ep = []
  request(content,(error,response,html)=>{
    if(!error && response.statusCode===200){
      const $ = cheerio.load(html)
      var episodes =$('.episodiotitle').find('a').attr('href');
      var epno =$('.numerando').text()
       var list = $('.episodios');
      // var test =list.find('.episodiotitle a').attr('href')
      // console.log(epno)
      // console.log(episodes)
    //  console.log(test)
     list.each((i,element) =>{
       var test = $(element).find('.episodiotitle a').attr('href')
       console.log(test)
     })
    }

  })

}

module.exports ={
  getEpisodes
}
