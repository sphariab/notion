import { useState } from 'react';
import 'antd/dist/antd.css';
import { Row } from 'antd';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteList from "./components/NoteList";
import DetailNote from "./components/DetailNote";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import { notesData } from './notesMock.js';

const App = () => {
    const getNotes = () => JSON.parse(localStorage.getItem('notes'));
    const getSelectedNote = () => localStorage.getItem('selectedNote');

    if (!getNotes()) {
        localStorage.setItem('notes', JSON.stringify((notesData)));
    }

    if (!getSelectedNote()) {
        localStorage.setItem('selectedNote', JSON.stringify((notesData[0])));
    }

    const [notes, setNotes] = useState(getNotes());
    const [selectedNote, setSelectedNote] = useState(JSON.parse(localStorage.getItem('selectedNote')));

    const updateNotes = filteredNotes => {
        localStorage.setItem('notes',  JSON.stringify(filteredNotes));
        setNotes(filteredNotes);
    };

    const deleteNote = id => {
        updateNotes(getNotes().filter(item => id !== item.id));
        selectNote(getNotes()[0]);
    };

    const selectNote = selectedNote => {
        localStorage.setItem('selectedNote',  JSON.stringify(selectedNote));
        setSelectedNote(selectedNote);
    };

    const saveNote = note => {
        notes.find(x => x.id === note.id) ?
            updateNotes(notes.map(item => item.id === note.id ?  note : item)) :
            updateNotes([...notes, note]);

        selectNote(note);
    };

    return (
        <Row  justify="space-evenly" style={{ marginTop: '10px'}}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>>
                <Routes>
                    <Route path="/" element={<DetailNote note={selectedNote} />} />
                    <Route path="create" element={<CreateNote saveNote={saveNote} />} />
                    <Route path="edit/:id" element={<EditNote saveNote={saveNote} />} exact />
                </Routes>
                <NoteList
                    setSelectedNote={selectNote}
                    deleteNote={deleteNote}
                    notes={notes}
                />
            </BrowserRouter>
        </Row>
    );
};

export default App;
