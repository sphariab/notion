import { Col } from 'antd';

const DetailNote = ({ note: { title, text }}) => (
    <Col lg={10} md={20} sm={20} xs={20} >
        <h1>{title}</h1>
        <div className='text' dangerouslySetInnerHTML={{ __html: text }} />
    </Col>
);

export default DetailNote;