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

router.get('/favorites', controllers.favorites);

router.post('/ratings', controllers.ratings);

router.put('/ratings', controllers.updateRatings);

router.get('/ratings', controllers.getReviews);

router.put('/helpful', controllers.updateHelpful);

router.put('/review/report', controllers.updateReport);

router.put('/favorite', controllers.updateFavorite);

router.get('/getReview', controllers.getReview);

module.exports = router;