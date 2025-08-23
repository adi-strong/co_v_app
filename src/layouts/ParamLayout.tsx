import {Card, Col, Row, Spinner} from "react-bootstrap";
import type {ReactNode} from "react";
import {LogoLoader} from "../loaders";

const ParamLayout = (props: {
  title: string
  subTitle?: string
  onRefresh?: () => void
  children: ReactNode
  loader: boolean
  className?: string
}) => {
  
  const {
    subTitle,
    title,
    children,
    onRefresh,
    loader,
    className,
  } = props

  return (
    <div className={className ?? ''}>
      <Row className='mb-3'>
        <Col xl={3} lg={4} md={12}>
          <div className='mb-4 mb-lg-0'>
            <h4 className='mb-1'>
              {loader && <Spinner className='me-1 text-primary' animation='grow' />}
              
              {!loader && onRefresh &&
                <i
                  className='me-1 bi bi-arrow-clockwise cursor-pointer text-primary'
                  onClick={onRefresh}
                  title='Actualiser' />}
              
              {title}
            </h4>
            
            {subTitle && <p className='mb-0 fs-5 text-muted'>{subTitle}</p>}
          </div>
        </Col>
        
        <Col xl={9} lg={8} md={12}>
          <Card>
            {(loader ? <LogoLoader /> : children) as ReactNode}
          </Card>
        </Col>
      </Row>
    </div>
  )
  
};

export default ParamLayout;
