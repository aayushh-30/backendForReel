const { Router } = require('express');
const { 
    registerUser,
    loginUser,
    logOutUser,
    registerFoodProvider,
    loginFoodProvider,
    logOutFoodProvider 
    } = require('../controllers/auth.controllers');

const { isLoggedIn } = require('../middlewares/auth.middlewares');

const router = Router();

router.post('/user/signUp', registerUser );
router.post('/user/login', loginUser );
router.get('/user/logOut', isLoggedIn ,logOutUser);

router.post('/foodprovider/signUp', registerFoodProvider );
router.post('/foodprovider/login', loginFoodProvider );
router.get('/foodprovider/logOut', isLoggedIn, logOutFoodProvider);


module.exports = router;