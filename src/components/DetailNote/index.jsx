import React from "react";
import { Col } from "antd";
import PropTypes from "prop-types";

const DetailNote = ({ note: { title, text } }) => (
  <Col lg={10} md={20} sm={20} xs={20}>
    <h1>{title}</h1>
    <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
  </Col>
);

DetailNote.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default DetailNote;
