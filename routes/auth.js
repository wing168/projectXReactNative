const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { signUpValidation } = require('../validation/validation');


/**************/
//Sign up route
/**************/

router.post('/signup', async (req,res) => {

    //Validate inputs first
    
    const { error } = signUpValidation(req.body)
    console.log(error);
    if (error) return res.status(400).send({success: false, message: error.details[0].message});

    //Check if email already exist in database
    
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) return res.status(400).send({success: false, message: 'Email already exists'});

    //Hash the password

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //Create new user

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save()
        res.send({success: true, message: 'Sign up successful! You will be redirected to log in shortly...'});

    } catch(err) {
        res.status(400).send(err);
    }

});


/*************/
//Log in route
/************/

//Logging in process

router.post('/login', async (req, res) => {


    //Check if email exists
    
    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).send({success: false, message: "Your email and password combination isn't recognised. Please try again"});

    //Check if password matches with database

    const validPW = await bcrypt.compare(req.body.password, user.password);

    if (!validPW) return res.status(400).send({success: false, message: "Your email and password combination isn't recognised. Please try again"});
    
    //Create and assign a token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.send({success: true, token: token, userID: user._id});

    //header('auth-token', token).
});

//Checking if user is logged in by verifying token

router.post('/verify', (req, res) => { 

    try{
        console.log(req.body);
        const tokenValidated = jwt.verify(req.body.token, process.env.TOKEN_SECRET);

        res.send({success: true, message: tokenValidated});
        console.log(tokenValidated)
        
    } catch (err) {
        res.status(401).send({success: false, message: err.message});
    }
    

});


module.exports = router;