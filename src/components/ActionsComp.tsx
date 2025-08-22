import type {SelectOptionType} from "../services/services.ts";
import {Button, Col, Row} from "react-bootstrap";
import type {Dispatch, SetStateAction} from "react";
import {formatNumberWithSpaces} from "../services/services.ts";
import SelectField from "./forms/SelectField.tsx";

const ActionsComp = ({ nbElements, options, setState, state, loader, size }: {
  nbElements: number
  options: SelectOptionType[]
  state: string
  setState: Dispatch<SetStateAction<string>>
  loader: boolean
  size?: 'sm' | 'lg'
}) => {

  return (
    <Row className='mt-8'>
      <Col md={7} className='mb-2'>
        <form className='row' onSubmit={e => e.preventDefault()}>
          <Col md={8} className='mb-1'>
            <SelectField
              name={state}
              value={state}
              onChange={({target}) => setState(target.value)}
              disabled={loader}
              size={size}
              options={options}
            />
          </Col>
          
          <Col md={4} className='mb-1'>
            <Button disabled={loader} type='submit' variant='outline-primary' size={size}>Appliquer</Button>
          </Col>
        </form>
      </Col>
      
      <Col md={5} className='mb-2 text-md-end'>{formatNumberWithSpaces(nbElements)} élément(s)</Col>
    </Row>
  )
  
};

export default ActionsComp;
