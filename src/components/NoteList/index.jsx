import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Input, Row } from "antd";
import Note from "../Note";
import PropTypes from "prop-types";
import "./index.scss";

const NoteList = ({ setSelectedNote, deleteNote, notes, saveNote }) => {
  const [notesItems, setNotes] = useState(notes);
  const onSearch = (value) =>
    setNotes(
      notes.filter((x) => x.title.includes(value) || x.text.includes(value)),
    );

  useEffect(() => {
    setNotes(notes);
  }, [notes]);

  return (
    <Col lg={10} md={20} sm={20} xs={20} className="note-list">
      <Row>
        <h2>Note list</h2>
      </Row>
      <Button className="note-list__create-button" type="primary">
        <Link to="/create">Create Note</Link>
      </Button>
      <Input.Search placeholder="Find text" onSearch={onSearch} />
      {notesItems &&
        notesItems.map((note) => (
          <Note
            key={note.id}
            note={note}
            setSelectedNote={setSelectedNote}
            deleteNote={deleteNote}
            saveNote={saveNote}
          />
        ))}
    </Col>
  );
};

NoteList.propTypes = {
  setSelectedNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({})),
  saveNote: PropTypes.func,
};

export default NoteList;
