import {Col} from "react-bootstrap";

export default function ColDataContent({ title, content, md, mb }: { md: number; mb?: number | string; title: any; content?: any }) {

  return (
    <Col md={md} className={`${mb ? 'mb-' + mb : ''} mt-2`}>
      <h6 className='text-uppercase fs-5 ls-2'>{title} </h6>
      <div className='mb-0'>{content}</div>
    </Col>
  )
  
};
