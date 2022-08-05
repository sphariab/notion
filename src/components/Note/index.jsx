import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Space } from "antd";
import { Link } from "react-router-dom";
import "./styles.scss";

const Note = ({
  note = { title: "", text: "" },
  setSelectedNote,
  deleteNote,
}) => {
  const { title, text, id } = note;

  return (
    <Card className="card">
      <div onClick={() => setSelectedNote(note)}>
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <Space>
        <Button type="primary">
          <Link to={{ pathname: `edit/${id}` }} {...note}>
            Edit
          </Link>
        </Button>
        <Button type="danger" onClick={() => deleteNote(id)}>
          Delete
        </Button>
      </Space>
    </Card>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  setSelectedNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

export default Note;
