import type { Request, Response } from 'express';
import type { ISong, IUser } from '../interface';
// call models
import { Song, User } from '../mongo';

/**
 * Show all songs
 */
export const showSongs = async (res: Response) => {
  try {
    const songs = await Song.find({}); //find all songs
    console.log(songs);
    res.status(200).send({ songs });
  } catch (e) {
    res.status(400).json({ error: 'Fail to show' });
  }
};
/**
 * Create song
 * @param {file} file Set file from form.
 * @param {string} id Set unique id from form.
 * @param {string} name Set name from form.
 */
export const createSong = async (req: Request, res: Response) => {
  const newSong = new Song({
    file: req.file?.path,
    id: req.body.id, //create new song
    name: req.body.name,
  });
  try {
    await newSong.save();
    res.status(200).json({ message: 'Created new song' });
  } catch (e) {
    res.status(400).json({ error: 'Fail to create' });
  }
};
/**
 * Show song
 * @param {string} id Set unique id from url.
 */
export const showSong = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const song = await Song.findOne({ id: id }); // find one song from id
    res.status(200).json(song);
  } catch (e) {
    res.status(400).json({ error: 'Fail to show' });
  }
};
/**
 * Update song
 * @param {file} file Set file from form.
 * @param {string} id Set unique id from url.
 * @param {string} name Set name from form.
 */
export const updateSong = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const song = await Song.findOneAndUpdate(
      { id: id },
      { $set: { name: req.body.name, file: req.file?.path } }, //change parametars
      { new: true },
    );
    res.status(200).json(song);
  } catch (e) {
    res.status(400).json({ error: 'Fail to update' });
  }
};
/**
 * Delete song
 * @param {string} id Set unique id from url.
 */
export const deleteSong = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const song = await Song.findOneAndRemove({ id: id }); //find and remove song
    res.status(200).json(song);
  } catch (e) {
    res.status(400).json({ error: 'Fail to delete' });
  }
};
/**
 * Like song
 * @param {string} id Set unique id from url.
 */
export const likeSong = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const song = (await Song.findOne({ id: id })) as ISong;
    const user = (await User.findOne({
      email: req.headers.authorization,
    })) as IUser; // use login user
    if (!song.likedBy || !song.dislikedBy) {
      return res.status(400).json('Likes does not exist');
    }
    if (
      song.likedBy.includes(user.email) ||
      song.dislikedBy.includes(user.email)
    ) {
      // the user has already voted
      return res.status(400).json('You have already voted');
    } else {
      song.likes++; // Incriment likes
      song.likedBy.push(user.email); // Add liker's email into array of likedBy
      // Save song post
      song.save();
      res.status(200).json(song);
    }
  } catch (e) {
    res.status(400).json({ error: 'Fail to like' });
  }
};
/**
 * Dislike song
 * @param {string} id Set unique id from url.
 */
export const dislikeSong = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const song = (await Song.findOne({ id: id })) as ISong;
    const user = (await User.findOne({
      email: req.headers.authorization,
    })) as IUser; //find login user
    if (
      song.likedBy.includes(user.email) ||
      song.dislikedBy.includes(user.email)
    ) {
      // the user has already voted
      res.status(400).json('You have already voted');
    } else {
      song.dislikes++; // Increase likes by one
      song.dislikedBy.push(user.email); // Add email to list of likers
      // Save song data
      song.save();
      res.status(200).json(song);
    }
  } catch (e) {
    res.status(400).json({ error: 'Fail to dislike' });
  }
};
