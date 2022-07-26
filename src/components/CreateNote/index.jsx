import Form from '../ui/Form';
import { nanoid } from "nanoid";

const CreateNote = ({ saveNote, id= nanoid() }) => <Form mode='create' saveNote={saveNote} id={id} />;

export default CreateNote;