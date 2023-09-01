const axios = require('axios');
const baseURL ='http://54.183.201.13:3000';
// const baseURL ='http://127.0.0.1:3000';

module.exports = {
  // GET ALL RECIPES WITH TYPE ID
  getMenuByType: (req, res) => {
    axios.get(`${baseURL}/api/recipes/?id=${req.query.id}&sort=${req.query.sort}`)
    .then(({data}) => res.send(data));
  },
  // GET ALL RECIPES WITH AN ARRAY OF RECIPE IDs
  favorites: (req, res) => {
    axios.get(`${baseURL}/api/favorites/?fav=${req.query.fav}`)
    .then(({data}) => res.send(data));
  },
  // UPDATE FAVORITE COUNT FOR THE MENU WITH RECIPE ID
  updateFavorite: (req, res) => {
    axios.put(`${baseURL}/api/favorite/?id=${req.query.id}&edit=${req.query.edit}`)
    .then(({data}) => res.send(data));
  },
  // GET ALL RECIPES THAT CONTAINS INPUT STRING AS SUBSTRING
  search: (req, res) => {
    axios.get(`${baseURL}/api/recipes/search/?input=${req.query.input}`)
    .then(({data}) => res.send(data));
  },
  // GET A SINGLE MENU WITH RECIPE ID
  getRecipe: (req, res) => {
    axios.get(`${baseURL}/api/recipe/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  // GET ALL INGREDIENTS IN DB
  getIngredients: (req, res) => {
    axios.get(`${baseURL}/api/ingredients`)
    .then(({data}) => res.send(data));
  },
  // GET ALL TYPES IN DB
  getTypes: (req, res) => {
    axios.get(`${baseURL}/api/types`)
    .then(({data}) => res.send(data));
  },
  // GET ALL TYPES IN DB SO THAT ALACARTES COME FIRST IN THE LIST
  getTypesAla: (req, res) => {
    axios.get(`${baseURL}/api/types/ala`)
    .then(({data}) => res.send(data));
  },
  // CREATE A RATING AND REVIEW FOR A MENU
  ratings: (req, res) => {
    axios.post(`${baseURL}/api/ratings`, req.body)
    .then(({data}) => res.send(data));
  },
  // UPDATE A RATING AND REVIEW FOR A MENU
  updateRatings: (req, res) => {
    const {id, rating, review} = req.query;
    axios.put(`${baseURL}/api/ratings/?id=${id}&rating=${rating}&review=${review}`)
    .then(({data}) => {
      res.send(data);
    })
  },
  // GET A REVIEW WITH REVIEW ID
  getReviews: (req, res) => {
    axios.get(`${baseURL}/api/ratings/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  // UPDATE RECIPE WITH IMG URL
  addImg: (req, res) => {
    axios.post(`${baseURL}/api/image`, req.body)
    .then(({data}) => res.send(data));
  },
  // GET RATINGS WITH RECIPE ID
  getReview: (req, res) => {
    axios.get(`${baseURL}/api/getReview/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  // UPDATE HELPFUL COUNT FOR REVIEW
  updateHelpful: (req, res) => {
    const {id, update} = req.query;
    axios.put(`${baseURL}/api/helpful/?id=${id}&update=${update}`)
    .then(({data}) => res.send(data));
  },
  // UPDATE REPORT STATUS OF REVIEW
  updateReport: (req, res) => {
    axios.put(`${baseURL}/api/review/report/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  }
}