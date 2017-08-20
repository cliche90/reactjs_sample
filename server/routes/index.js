import express from 'express';
import accout from './account';
import memo from './memo';

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo);

export default router;