const router = require('express').Router();
const controllers = require('./controllers');

// GET ALL RECIPES WITH TYPE ID
router.get('/recipesWithType', controllers.getMenuByType);

// GET ALL RECIPES WITH AN ARRAY OF RECIPE IDs
router.get('/favorites', controllers.favorites);

// UPDATE FAVORITE COUNT FOR THE MENU WITH RECIPE ID
router.put('/favorite', controllers.updateFavorite);

// GET ALL RECIPES THAT CONTAINS INPUT STRING AS SUBSTRING
router.get('/search', controllers.search);

// GET A SINGLE MENU WITH RECIPE ID
router.get('/recipe', controllers.getRecipe);

// GET ALL INGREDIENTS IN DB
router.get('/ingredients', controllers.getIngredients);

// GET ALL TYPES IN DB
router.get('/types', controllers.getTypes);

// GET ALL TYPES IN DB SO THAT ALACARTES COME FIRST IN THE LIST
router.get('/types/ala', controllers.getTypesAla);

// CREATE A RATING AND REVIEW FOR A MENU
router.post('/ratings', controllers.ratings);

// UPDATE A RATING AND REVIEW FOR A MENU
router.put('/ratings', controllers.updateRatings);

// GET A REVIEW WITH REVIEW ID
router.get('/getReview', controllers.getReview);

// UPDATE RECIPE WITH IMG URL
router.post('/img', controllers.addImg);

// GET RATINGS WITH RECIPE ID
router.get('/ratings', controllers.getReviews);

// UPDATE HELPFUL COUNT FOR REVIEW
router.put('/helpful', controllers.updateHelpful);

// UPDATE REPORT STATUS OF REVIEW
router.put('/review/report', controllers.updateReport);


module.exports = router;