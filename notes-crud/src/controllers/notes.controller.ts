import Note from '../models/Note';
import makeCall from '../utils/validateTojen';

export const addNote = async ({ body, headers }: any, res: any) => {
  const { status, message, user }: any = await makeCall(headers.authorization);

  if (status !== 200) return new Error(message);

  const { title, content } = body;

  const newNote = new Note({ title, content, user_create: user._id, user_update: user._id });
  const saveNote: any = await newNote.save();

  res.status(200).json({ status: 201, saveNote });
};

export const updateNote = async ({ body, headers }: any, res: any) => {
  const { status, message, user }: any = await makeCall(headers.authorization);

  if (status !== 200) return new Error(message);

  const { title, content } = body;

  const newNote: any = await Note.findOneAndUpdate(
    { _id: body._id },
    { title, content, user_update: user._id },
    { new: true }
  );

  res.status(200).json({ status: 201, newNote });
};

export const getNoteByUser = async ({ headers }: any, res: any) => {
  const { status, message, user }: any = await makeCall(headers.authorization);

  if (status !== 200) return new Error(message);

  let response = await Note.find({ user_create: user._id, status: 1 });

  res.status(200).json({ status: 201, response });
};

export const getNoteById = async ({ headers, params }: any, res: any) => {
  const { status, message }: any = await makeCall(headers.authorization);

  if (status !== 200) return new Error(message);

  console.log(params.id);
  

  let response = await Note.find({ _id: params.id, status: 1 });

  res.status(200).json({ status: 201, response });
};

export const deleteNote = async ({ body, headers }: any, res: any) => {
  const { status, message, user }: any = await makeCall(headers.authorization);

  if (status !== 200) return new Error(message);

  const deleteNote: any = await Note.findByIdAndRemove(body._id);

  res.status(200).json({ status: 201, deleteNote });
};
