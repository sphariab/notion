import Form from '../ui/Form';
import { useParams } from "react-router-dom";

const EditNote = ({ saveNote }) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const { id } = useParams();
    const { title, text } = notes.filter(item => item.id === id)[0];

    return (
        <Form
            mode='edit'
            saveNote={saveNote}
            id={id}
            title={title}
            text={text}
        />);
}

export default EditNote;