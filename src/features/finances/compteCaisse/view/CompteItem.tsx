import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {
  formatDecimalNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button, Image} from "react-bootstrap";
import moment from "moment";
import type {CompteCaisse} from "../model/compteCaisseService.ts";
import CompteForm from "./CompteForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function CompteItem(props: {
  compte: CompteCaisse
  setComptes: Dispatch<SetStateAction<CompteCaisse[]>>
  index: number
}) {
  
  const {
    compte,
    index,
    setComptes,
  } = props
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <CheckField
            inline
            name='selected'
            value={compte.selected}
            checked={compte.selected}
            onChange={(): void => setSelectedDataItem(index, setComptes)}
            className='me-0'
          />
          <Link to={`/app/comptes/${compte.id}/${compte?.slug}`}>
            {compte.nom.toUpperCase()}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>
          <span className='me-1'>
            <Image
              src={compte.first.image}
              width={20}
              height={20}
              alt='1ère devise'
            />
          </span>
          {compte.first.code}
        </td>
        
        <td>
          <span className='me-1'>
            <Image
              src={compte.last.image}
              width={20}
              height={20}
              alt='2eme devise'
            />
          </span>
          {compte.last.code}
        </td>
        
        <td>{formatDecimalNumberWithSpaces(compte.taux)} {compte.first.symbol}</td>
        <td>{formatDecimalNumberWithSpaces(compte.solde)} {compte.first.symbol}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(compte, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={compte}
        show={isDel}
        onRefresh={(): void => { }}
        title={<><br/> compte : {compte.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un compte'
        onRefresh={() => { }}
        children={(<CompteForm data={compte}/>) as ReactNode}
      />
    </>
  )
  
}
