const axios = require('axios');
const baseURL ='http://54.183.201.13:3000';
// const baseURL ='http://127.0.0.1:3000';

module.exports = {
  getIngredients: (req, res) => {
    axios.get(`${baseURL}/api/ingredients`)
    .then(({data}) => res.send(data));
  },
  getTypes: (req, res) => {
    axios.get(`${baseURL}/api/types`)
    .then(({data}) => res.send(data));
  },
  getMenuByType: (req, res) => {
    axios.get(`${baseURL}/api/recipes/?id=${req.query.id}&sort=${req.query.sort}`)
    .then(({data}) => res.send(data));
  },
  rateAMenu: (req, res) => {
    axios.put(`${baseURL}/api/rating/?id=${req.query.id}&prev=${req.query.prev}&rate=${req.query.new}`)
    .then(({data}) => res.send(data));
  },
  getRecipe: (req, res) => {
    axios.get(`${baseURL}/api/recipe/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  addImg: (req, res) => {
    axios.post(`${baseURL}/api/image`, req.body)
    .then(({data}) => res.send(data));
  },
  search: (req, res) => {
    axios.get(`${baseURL}/api/recipes/search/?input=${req.query.input}`)
    .then(({data}) => res.send(data));
  },
  getTypesAla: (req, res) => {
    axios.get(`${baseURL}/api/types/ala`)
    .then(({data}) => res.send(data));
  },
  favorites: (req, res) => {
    axios.get(`${baseURL}/api/favorites/?fav=${req.query.fav}`)
    .then(({data}) => res.send(data));
  },
  ratings: (req, res) => {
    axios.post(`${baseURL}/api/ratings`, req.body)
    .then(({data}) => res.send(data));
  },
  updateRatings: (req, res) => {
    const {id, rating, review} = req.query;
    axios.put(`${baseURL}/api/ratings/?id=${id}&rating=${rating}&review=${review}`)
    .then(({data}) => {
      res.send(data);
    })
  },
  getReviews: (req, res) => {
    axios.get(`${baseURL}/api/ratings/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  updateHelpful: (req, res) => {
    const {id, update} = req.query;
    axios.put(`${baseURL}/api/helpful/?id=${id}&update=${update}`)
    .then(({data}) => res.send(data));
  },
  updateReport: (req, res) => {
    axios.put(`${baseURL}/api/review/report/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  }
}