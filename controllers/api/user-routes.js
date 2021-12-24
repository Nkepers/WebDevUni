const router = require('express').Router();
const { User } = require('../../models');
const sgMail = require('@sendgrid/mail')

// CREATE new user
router.post('/', async (req, res) => {
    console.log('Here');
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            sgMail.setApiKey(process.env.SEND_GRID_API)
            const msg = {
                to: '', // Change to your recipient
                from: 'webdeveloperuni@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error.response.body)
                })

            res.status(200).render('homepage', { dbUserData });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).render('homepage', { dbUserData });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.get('/logout', (req, res) => {
    console.log('logout here')
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.render('login')
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;