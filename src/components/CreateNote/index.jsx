import React from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import Form from "../ui/Form";

const CreateNote = ({ saveNote, id = nanoid() }) => (
  <Form mode="create" saveNote={saveNote} id={id} />
);

CreateNote.propTypes = {
  saveNote: PropTypes.func.isRequired,
  id: PropTypes.number,
};

export default CreateNote;
