import { Router } from 'express';
const router = Router();

import * as noteCtrl from '../controllers/notes.controller';

router.post('/create', noteCtrl.addNote);
router.patch('/update', noteCtrl.updateNote);
router.get('/get', noteCtrl.getNoteByUser);
router.get('/get/:id', noteCtrl.getNoteById);
router.delete('/delete', noteCtrl.deleteNote);

export default router;
