import * as express from 'express';
import { upload } from '../other/multer';
import { verify, admin } from '../other/middleware'; //middleware for token and admin
const router = express.Router();
import {
  showSongs,
  createSong,
  showSong,
  updateSong,
  deleteSong,
  likeSong,
  dislikeSong,
} from '../controller';

// route for song
router.get('/all', verify, showSongs);
router.get('/:id', [verify, admin], showSong);
router.post('/', [upload.single('file'), verify, admin], createSong);
router.put('/:id', [upload.single('file'), verify, admin], updateSong);
router.delete('/:id', [upload.single('file'), verify, admin], deleteSong);
router.put('/:id/like', verify, likeSong);
router.put('/:id/dislike', verify, dislikeSong);

export { router as songRouter };
