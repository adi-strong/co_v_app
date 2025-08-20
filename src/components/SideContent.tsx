import type {ReactNode} from "react";
import {Offcanvas} from "react-bootstrap";

const SideContent = (props: {
  show: boolean
  onHide: () => void
  onRefresh?: () => void
  icon?: string
  title: any
  children: ReactNode
}) => {
  
  const {
    show,
    onHide,
    icon,
    title,
    children,
  } = props

  return (
    <Offcanvas show={show} onHide={onHide} placement='end'>
      <Offcanvas.Header closeButton className='pb-0'>
        <Offcanvas.Title className='fw-bold'>
          {icon && <i className={`me-1 bi bi-${icon}`}/> as ReactNode}
          {title}
        </Offcanvas.Title>
      </Offcanvas.Header> <hr/>
      
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  )
  
};

export default SideContent;
