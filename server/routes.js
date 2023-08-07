const router = require('express').Router();
const controllers = require('./controllers');

router.get('/hello', (req, res) => {
  res.send('hello');
});

router.get('/ingredients', controllers.getIngredients);

router.get('/types', controllers.getTypes);

router.get('/types/ala', controllers.getTypesAla);

router.get('/recipesWithType', controllers.getMenuByType);

router.put(`/rating`, controllers.rateAMenu);

router.get('/recipe', controllers.getRecipe);

router.post('/img', controllers.addImg);

router.get('/search', controllers.search);

module.exports = router;