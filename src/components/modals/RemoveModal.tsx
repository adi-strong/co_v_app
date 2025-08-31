import {Button, Modal} from "react-bootstrap";
import {ReactNode, useState} from "react";

export default function RemoveModal(props: {
  show: boolean
  isItIrreversible?: boolean
  data: any,
  onHide: () => void
  onRefresh: () => void
  title: any
  onSubmit: () => void
}) {
  
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  
  const {
    onHide,
    title,
    show,
    onSubmit,
    onRefresh,
    data,
    isItIrreversible,
  } = props
  
  const onConfirm = (): void => setIsConfirmed(!isConfirmed)
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='bg-danger' closeButton>
        <Modal.Title className='text-light'>
          <i className='bi bi-trash'/> Suppression
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='text-center'>
        {isItIrreversible && (
          <p>
            <code>
              <i className='bi bi-exclamation-triangle-fill'/> Cette action est irreversible.
            </code>
          </p>
        ) as ReactNode}
        
        <code className='text-dark'>
          Êtes-vous certain(e) de vouloir supprimer ce(tte)
          <b className='mx-1'>{title}</b>
          <i className='bi bi-question-circle text-danger mx-1'/>
        </code>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={onHide}>
          <i className='bi bi-x me-1' />
          Annuler
        </Button>
        
        {!isConfirmed && (
          <Button variant='danger' onClick={onConfirm}>
            <i className='bi bi-trash'/> Supprimer
          </Button>
        ) as ReactNode}
        
        {isConfirmed && onHide && onRefresh && (
          <Button variant='danger' onClick={(): void => {
            onConfirm()
            onSubmit()
          }}>
            <i className='bi bi-exclamation-circle-fill'/> Valider
          </Button>
        ) as ReactNode}
      </Modal.Footer>
    </Modal>
  )
  
}
