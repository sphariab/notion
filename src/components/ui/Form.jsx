import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Alert, Input, Space, Button, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import { cleanCopiedCode } from "../../utils";
import PropTypes from "prop-types";
import "./styles.scss";

const Form = ({ mode, saveNote, title = "", text = "", id }) => {
  const navigate = useNavigate();
  const inputEl = useRef(null);
  const [formData, setFormData] = useState({ id, title, text });
  const [isWarning, setWarning] = useState(false);
  const [titleField, setTitle] = useState(title);
  const [titleMaxLength, setMaxLength] = useState(20);
  const enteredSymbolsLength =
    inputEl && inputEl.current && inputEl.current.props.value.length;
  const isMaxTitleLengthExceeded = titleMaxLength - enteredSymbolsLength < 0;

  useEffect(() => {
    if (mode === "edit") {
      setFormData({ title, text, id });
    }
  }, []);

  const onChangeTitle = (value) => {
    setWarning(inputEl.current.props.value.length > titleMaxLength);
    setTitle(value);
    setFormData({ ...formData, title: value });
  };

  const copyFromClipboard = () => {
    navigator.clipboard.readText().then((copiedText) => {
      setFormData({ ...formData, text: cleanCopiedCode(copiedText) });
    });
  };

  const onChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  return (
    <Col span={10}>
      <Row className="field">
        <div className="field__title">Title</div>
        <div className="field__input">
          <HighlightWithinTextarea
            highlight={[
              {
                highlight: [titleMaxLength, 1000000],
                className: "red",
              },
            ]}
            onChange={onChangeTitle}
            value={titleField}
            placeholder={null}
            ref={inputEl}
          />
        </div>
        {isWarning && (
          <>
            <Alert
              className="field__alert"
              banner
              type="warning"
              message="max length is 20 symbols"
              closable
            />
          </>
        )}
        <span
          className={
            isMaxTitleLengthExceeded ? "counter-red" : "counter-green"
          }>
          {titleMaxLength - enteredSymbolsLength}
        </span>
      </Row>
      <Row className="field">
        <div className="field__title">Title max Length</div>
        <InputNumber
          onChange={(value) => setMaxLength(value)}
          defaultValue={20}
          type="number"
        />
      </Row>
      <Row className="field">
        <div className="field__title">Text</div>
        <Input.TextArea
          onChange={onChange}
          name="text"
          value={formData.text}
          onPaste={(e) => e.preventDefault()}
        />
        <Button onClick={() => copyFromClipboard()}>Copy from clipboard</Button>
      </Row>
      <Row>
        <Space>
          <Button
            disabled={isMaxTitleLengthExceeded}
            onClick={() => {
              saveNote({ ...formData, text: cleanCopiedCode(formData.text) });
              navigate("/");
            }}
            type="primary">
            {mode === "edit" ? "Save" : "Create"}
          </Button>
          <Button type="danger" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Space>
      </Row>
    </Col>
  );
};

Form.propTypes = {
  mode: PropTypes.string.isRequired,
  saveNote: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
};

export default Form;
