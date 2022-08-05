import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Form from "../ui/Form";

const EditNote = ({ saveNote }) => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  const { id } = useParams();
  const { title, text } = notes.filter((item) => item.id === id)[0];

  return (
    <Form mode="edit" saveNote={saveNote} id={id} title={title} text={text} />
  );
};

EditNote.propTypes = {
  saveNote: PropTypes.func.isRequired,
};

export default EditNote;
