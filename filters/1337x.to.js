const {
  getMovies
} = require('./../1337x.to/movies')

const sortRequest = (sort, res) => {

  switch (sort.sort) {
    case 'time-desc':
      var url = 'https://1337x.to/sort-category-search/' + sort.title + '/Movies/time/desc/' + sort.page + '/'

      getMovies(url, res)
      break
    case 'time-asc':
      var url = 'https://1337x.to/sort-category-search/' + sort.title + '/Movies/time/asc/' + sort.page + '/'

      getMovies(url, res)
      break
    case 'seeder-desc':
      var url = 'https://1337x.to/sort-category-search/' + sort.title + '/Movies/seeders/desc/' + sort.page + '/'
      getMovies(url, res)

      break
    case 'seeder-asc':
      var url = 'https://1337x.to/sort-category-search/' + sort.title + '/Movies/seeders/desc/' + sort.page + '/'
      getMovies(url, res)

      break
    case 'size-desc':
      var url = 'https://1337x.to/sort-category-search/' + sort.title + '/Movies/size/desc/' + sort.page + '/'

      getMovies(url, res)
      break
    case 'size-asc':
      var url = 'https://1337x.to/sort-category-search/' + sort.title + '/Movies/size/desc/' + sort.page + '/'
      getMovies(url, res)

      break
    default:
      res.status(400).send()
      break

  }
}

module.exports = {
  sortRequest
}