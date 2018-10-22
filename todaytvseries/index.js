const cheerio = require('cheerio')
const request = require('request')
var ep = (content, res) => {
    var url = 'http://www.todaytvseries2.com' + content
    var eps = []
    request(url,
        (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                const list = $('.row2');

                list.each(function (i, element) {
                    const episode = $(element).find('.cell2');
                    const size = $(element).find('.cell3');
                    const url = $(element).find('.cell4 a').attr('href');

                    var data = {
                         episode: episode.text(),
                         size: size.text(),
                         url: url
                     }

                    eps.push(data)


                })
                res.send(eps)
            }
        })

}


module.exports ={
  ep
}
