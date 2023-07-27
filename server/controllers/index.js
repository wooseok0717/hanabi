const axios = require('axios');
// const baseURL ='http://54.183.201.13:3000';
const baseURL ='http://127.0.0.1:3000';

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
    axios.get(`${baseURL}/api/recipes/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
}