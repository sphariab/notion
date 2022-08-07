import React from "react";
import { Col } from "antd";
import PropTypes from "prop-types";

const DetailNote = ({ note }) =>
  note && Object.keys(note).length > 0 ? (
    <Col lg={10} md={20} sm={20} xs={20}>
      <h1>{note.title}</h1>
      <div className="text" dangerouslySetInnerHTML={{ __html: note.text }} />
    </Col>
  ) : (
    <Col lg={10} md={20} sm={20} xs={20}>
      <div>Please select Note</div>
    </Col>
  );

DetailNote.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default DetailNote;
