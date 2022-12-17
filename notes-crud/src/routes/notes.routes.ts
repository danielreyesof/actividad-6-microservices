import { Router } from 'express';
const router = Router();

import * as noteCtrl from '../controllers/notes.controller';

router.post('/create', noteCtrl.addNote);
router.patch('/update', noteCtrl.updateNote);
router.get('/get-notes', noteCtrl.getNoteByUser);
router.delete('/delete', noteCtrl.deleteNote);

export default router;
