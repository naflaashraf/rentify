const express = require('express');
const router = express.Router();

router.get('/session', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    res.json({ userId: req.session.userId });
});

module.exports = router;
