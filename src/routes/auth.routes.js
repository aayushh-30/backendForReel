const { Router } = require('express');
const { registerUser,loginUser,logOutUser } = require('../controllers/auth.controllers');

const router = Router();

router.post('/signUp', registerUser );
router.post('/login', loginUser );
router.get('/logOut', logOutUser)


module.exports = router;