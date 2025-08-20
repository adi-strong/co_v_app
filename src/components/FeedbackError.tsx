import {Form} from "react-bootstrap";

const FeedbackError = ({ error = null }: { error: any }) => {
  
  return (
    <Form.Control.Feedback type='invalid'>
      { error }
    </Form.Control.Feedback>
  )
  
};

export default FeedbackError;
