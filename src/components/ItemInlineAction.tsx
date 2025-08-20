import {Link} from "react-router-dom";
import type {ReactNode} from "react";
import {Button} from "react-bootstrap";
import {RemoveModal} from "./index.ts";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function ItemInlineAction(props: {
  show?: boolean
  isQuickEditExists?: boolean
  onShowQuickForm?: () => void
  uri: string
  data: any
  title: string
  children?: ReactNode
  isDeleteClicked: boolean
  onDeleteClicked: () => void
  removeTitle?: string
  isItIrreversible?: boolean
}) {
  
  const {
    data,
    uri,
    show,
    onDeleteClicked,
    isDeleteClicked,
    title,
    children,
    removeTitle,
    onShowQuickForm,
    isItIrreversible,
    isQuickEditExists } = props
  
  return (
    <>
      <Link to={uri} style={{ fontSize: '0.8rem' }}>
        <small>Modifier</small>
      </Link>
      
      {!show && <small className='me-1 mx-1' style={{ fontSize: '0.8rem' }}>|</small>}
      
      {show && (
        <>
          <small className='me-1 mx-1'>|</small>
          
          <Button className='p-0' variant='link' onClick={onShowQuickForm} style={{ fontSize: '0.8rem' }}>
            <small>Modification rapide</small>
          </Button>
          
          <small className='me-1 mx-1'>|</small>
        </>
      ) as ReactNode}
      
      <Button className='p-0' variant='link' onClick={onDeleteClicked} style={{ fontSize: '0.8rem' }}>
        <small className='text-danger'>
          {removeTitle ?? 'Supprimer'}
        </small>
      </Button>
      
      {isQuickEditExists && children && children}
      
      <RemoveModal
        isItIrreversible={isItIrreversible}
        onHide={onDeleteClicked}
        data={data}
        onSubmit={() => onSubmit(data, onDeleteClicked, (): void => { })}
        show={isDeleteClicked}
        onRefresh={(): void => { }}
        title={title}
      />
    </>
  )
  
}
