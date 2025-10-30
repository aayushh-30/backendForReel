const users = require('../models/user.models');
const FoodProvider = require('../models/foodProvider.models');
const { SuccessResponse,ErrorResponse } = require('../utils/responseTemplates');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Extract user details from request body

        if (!username || !email || !password) {
           return res
        .status(400)
        .json(new ErrorResponse('All fields (username, email, password) are required'));
    }

        const existingUser = await users.findOne({ $or: [ { email }, { username } ] });
        if (existingUser) {
            return res.status(400).json(new ErrorResponse('User already exists with provided email or username'));
        }


        // Create a new user instance
        const newUser = new users({ username, email, password });
        await newUser.save(); 
        res.status(201).json(new SuccessResponse('User registered successfully', { userId: newUser._id }));
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json(new ErrorResponse('Failed to register user', error.message));
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Extract user details from request body

        if ((!username && !email) || !password) {
           return res
            .status(400)
            .json(new ErrorResponse('All fields (username, email, password) are required'));
        }

        const existingUser = await users.findOne({ $or: [ { email }, { username } ] });
        if (!existingUser) {
            return res.status(400).json(new ErrorResponse('No user found with the given email or username'));
        }

        // Validate password
        const isPasswordValid = await existingUser.ComparePassword(password);
        if (! isPasswordValid) {
            return res.status(400).json(new ErrorResponse('Invalid password'));
        }

        const token = existingUser.generateToken();


        return res.status(200)
                  .cookie('token', token)
                  .json(new SuccessResponse('User logged in successfully', { userId: existingUser._id, token : token }));


    } catch (error) {
        console.error('Error LoggingIn user:', error);
        res.status(500).json(new ErrorResponse('Failed to Login user', error.message));
        
    }
};

const logOutUser = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json(new ErrorResponse('No user is currently logged in'));
        }
        res.clearCookie('token');
        res.status(200).json(new SuccessResponse('User logged out successfully', null));
    } catch (error) {
        console.error('Error LoggingOut user:', error);
        res.status(500).json(new ErrorResponse('Failed to Logout user', error.message));
    }

};

const registerFoodProvider = async (req, res) => {
     try {
        const { name, email, password,phone } = req.body; // Extract user details from request body

        if (!name || !email || !password || !phone) {
           return res
        .status(400)
        .json(new ErrorResponse('All fields (username, email, password, phone) are required'));
    }

        const existingFoodProvider = await users.findOne({ $or: [ { email }, { name } ] });
        if (existingFoodProvider) {
            return res.status(400).json(new ErrorResponse('Food Provider already exists with provided email or username'));
        }


        // Create a new user instance
        const NewFoodProvider = new FoodProvider({ name, email, password, phone });
        await NewFoodProvider.save(); 
        res.status(201).json(new SuccessResponse('Food Provider registered successfully', { FoodProviderID: NewFoodProvider._id }));
    }
    catch (error) {
        console.error('Error registering Food Provider:', error);
        res.status(500).json(new ErrorResponse('Failed to register Food Provider', error.message));
    }

}

const loginFoodProvider = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extract user details from request body

        if ((!name && !email) || !password) {
           return res
            .status(400)
            .json(new ErrorResponse('All fields (name, email, password) are required'));
        }

        const existingUser = await FoodProvider.findOne({ $or: [ { email }, { name } ] });
        if (!existingUser) {
            return res.status(400).json(new ErrorResponse('No FoodProvider found with the given email or username'));
        }

        // Validate password
        const isPasswordValid = await existingUser.ComparePassword(password);
        if (! isPasswordValid) {
            return res.status(400).json(new ErrorResponse('Invalid password'));
        }

        const token = existingUser.generateToken();




        return res.status(200)
                  .cookie('token', token)
                  .json(new SuccessResponse('Food Provider logged in successfully', { userId: existingUser._id, token : token }));


    } catch (error) {
        console.error('Error LoggingIn Food Provider:', error);
        res.status(500).json(new ErrorResponse('Failed to Login Food Provider', error.message));
        
    }

}

const logOutFoodProvider = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json(new ErrorResponse('No Food Provider is currently logged in'));
        }
        res.clearCookie('token');
        res.status(200).json(new SuccessResponse('Food Provider logged out successfully', null));
    } catch (error) {
        console.error('Error LoggingOut Food Provider:', error);
        res.status(500).json(new ErrorResponse('Failed to Logout Food Provider', error.message));
    }

}

module.exports = { 
    registerUser,
    loginUser,
    logOutUser,
    registerFoodProvider,
    loginFoodProvider,
    logOutFoodProvider
 };
