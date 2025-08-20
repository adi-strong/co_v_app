import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const PageTitles = (props: { title: any }) => {
  
  const { title } = props

  return (
    <Row>
      <Col>
        <div className='border-bottom pb-4 mb-4'>
          <h3 className='mb-0 fw-bold'>{title}</h3>
        </div>
      </Col>
    </Row>
  )
  
}

export default PageTitles;
