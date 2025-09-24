import type {Dispatch, SetStateAction} from "react";
import {useSelector} from "react-redux";
import type {DeviseState} from "../../compteCaisse/model/devise.slice.ts";
import {Button, Col, Row} from "react-bootstrap";
import SelectField from "../../../../components/forms/SelectField.tsx";
import {handleAddSubItemToTheItemArray, handleChange} from "../../../../services/form.hander.service.ts";
import {TextField} from "../../../../components";
import type {BonEntreeError, SaveBonEntree} from "../model/bonEntreeService.ts";
import {totalEntriesAmount} from "../model/bonEntreeService.ts";
import PostEntryItem from "./PostEntryItem.tsx";

export default function PostEntryFields(props: {
  state: SaveBonEntree
  setState: Dispatch<SetStateAction<SaveBonEntree>>
  loader: boolean
  errors: BonEntreeError
}) {
  
  const {
    state,
    setState,
    errors,
    loader,
  } = props
  
  const { devise } = useSelector((state: DeviseState) => state.devise)
  
  return (
    <>
      <Row>
        <Col className='mb-2'>
          <SelectField
            required
            disabled={loader}
            label='Devise'
            name='devise'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.devise}
            options={devise ? devise.options : []}
            error={errors.devise}
          />
        </Col>
        
        <Col className='mb-2'>
          <TextField
            disabled={loader}
            type='datetime-local'
            label='Date'
            name='createdAt'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.createdAt}
          />
        </Col>
      </Row>
      
      <Row>
        <Col className='mb-2'>
          <TextField
            required
            autoFocus
            disabled={loader}
            label='Objet:'
            name='objet'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.objet}
            placeholder='...'
            error={errors.objet}
          />
        </Col>
        
        <Col className='mb-2'>
          <TextField
            disabled={loader}
            label='Porteur'
            name='porteur'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.porteur}
            error={errors.porteur}
          />
        </Col>
      </Row>
      
      <div className='bg-light p-2' style={{borderRadius: 4}}>
        {state.designations.length > 0 && state.designations.map((d, i) =>
          <PostEntryItem
            key={i}
            item={d}
            loader={loader}
            entry={state}
            setEntry={setState}
            index={i}
          />)}
        
        <hr className='mt-1 mb-1'/>
        
        <Button
          size='sm'
          disabled={loader}
          className='w-100'
          variant='dark'
          onClick={(): void => handleAddSubItemToTheItemArray(
            state,
            setState,
            'designations',
            {libelle: '', qte: 0, prixUnitaire: 0}
          )}
        >
          <i className='bi bi-plus'/> Ajouter
        </Button>
        
        <hr className='mt-1'/>
        
        <div className='border-dashed border-1 p-2 mb-3 d-flex justify-content-between fw-bold'>
          <span>TOTAL</span>
          <span>{totalEntriesAmount(state.designations)} ({state?.devise ?? '—'})</span>
        </div>
      </div>
    </>
  )
  
}
