const router = require('express').Router();
const controllers = require('./controllers');

router.get('/hello', (req, res) => {
  res.send('hello');
});

router.get('/ingredients', controllers.getIngredients);

router.get('/types', controllers.getTypes);

router.get('/recipesWithType', controllers.getMenuByType);

module.exports = router;