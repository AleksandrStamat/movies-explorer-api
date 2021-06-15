const router = require('express').Router();
const { sendForm } = require('../controllers/telegram');

router.post('/', sendForm);

module.exports = router;