import express from 'express';

const router = express.Router();

/*
    Account signup: POST /api/account/singup
    Body Sample: {
        "username": "test",
        "password": "test"
    }
    Error Code:
        1. BAD USERNAME
        2. BAD PASSWORD
        3. USERNAME ALREADY EXIST
*/
router.post('/signup', (req, res) => {

    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    Account.findOne({ username: req.body.username }, (err, exists) => {
        if(err) throw err;
        if(exists) {
            return res.status(409).json({
                error: "USERNAME ALREADY EXIST",
                code: 3
            });
        }

        let account = new Account({
            username: req.body.username,
            password: req.body.password
        })

        account.password = account.generateHash(account.password);

        account.save(err => {
            if(err) throw err;
            return res.json({
                success: true
            });
        });
    });
});


/*
    Account sign in: POST /api/account/signin
    Body Sample: {
        "username": "test",
        "password": "tets"
    }
    Error Code:
        1. LOGIN FAILED
*/
router.post('/signin', (req, res) => {
    
    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    Account.findOne({ username: req.body.username }, (err, account) => {
        if(err) throw err;

        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        return res.json({
            success: true
        });
    });
});

/*
    Get current user info: GET /api/account/getinfo
*/
router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({
        info: req.session.loginInfo
    });
});

/*
    Logout: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
    })
    res.json({
        success: true
    });
});

export default router;