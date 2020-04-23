import * as express from 'express';

const router = express.Router();

router.get('/api/test', (req, res, next) => {
    res.json('Test');
});

export default router;