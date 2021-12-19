import * as express from 'express';
const router = express.Router();
import { register, login } from '../controller';

router.post('/register', register);
router.post('/login', login);

export { router as userRouter };
