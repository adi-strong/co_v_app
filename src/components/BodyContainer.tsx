import {Container} from "react-bootstrap";
import type {ReactNode} from "react";

const BodyContainer = ({ children }: { children: ReactNode }) => {

  return (
    <Container className='p-6' fluid>
      {children}
    </Container>
  )
  
};

export default BodyContainer;
