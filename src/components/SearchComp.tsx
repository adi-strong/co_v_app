import {TextField} from "./index.ts";
import {Button, Col, Row} from "react-bootstrap";
import type {Dispatch, SetStateAction} from "react";
import {handleChange} from "../services/form.hander.service.ts";

const SearchComp = ({ state, setState, value, btnLabel, loader, onSubmit, size, md1, md2, md3, md4 }: {
  value: any,
  state: object,
  setState: Dispatch<SetStateAction<object>>,
  btnLabel: string,
  size?: 'sm' | 'lg',
  onSubmit: () => void,
  loader: boolean
  md1: number
  md2: number
  md3: number
  md4: number
}) => {

  return (
    <Row className='mb-3'>
      <Col md={md1}/>
      <form onSubmit={e => e.preventDefault()} className={`col-md-${md2} text-end`}>
        <Row>
          <Col md={md3} className='mb-1'>
            <TextField
              name='keyword'
              onChange={(e): void => handleChange(e, state, setState)}
              value={value}
              size={size}
              disabled={loader}
              placeholder='Votre recherche ici...'
            />
          </Col>
          
          <Col md={md4} className='mb-1'>
            <Button disabled={loader} type='submit' variant='outline-primary' size={size}>{btnLabel}</Button>
          </Col>
        </Row>
      </form>
    </Row>
  )
  
};

export default SearchComp;
