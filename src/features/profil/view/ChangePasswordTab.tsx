import type {User} from "../../user/model/userService.ts";
import {useState} from "react";
import type {ChangeProfilePassword, ChangeProfilePasswordError} from "../model/profilService.ts";
import {initPasswordErrorState, initPasswordState} from "../model/profilService.ts";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {handleShow, onGetRandomPasswordText} from "../../../services/services.ts";
import {handleChange} from "../../../services/form.hander.service.ts";
import {TextField} from "../../../components";

export default function ChangePasswordTab({ data }: { data: User }) {
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState<ChangeProfilePassword>(initPasswordState())
  const [errors, setErrors] = useState<ChangeProfilePasswordError>(initPasswordErrorState())
  
  return (
    <>
      <Card.Title as='h4' className='text-dark mt-3'>Changer de mot de passe</Card.Title> <hr/>
      
      <form onSubmit={e => e.preventDefault()}>
        <Row className='mb-5'>
          <Form.Label htmlFor='password' className='col-md-5'><code>*</code> Nouveau mot de passe</Form.Label>
          <Col md={7}>
            <Button
              type='button'
              disabled={false}
              className='mb-2'
              variant='outline-primary'
              size='sm'
              onClick={(): void => onGetRandomPasswordText(12, setState)}
            >
              Générer un mot de passe
            </Button>
            
            <TextField
              required
              autoFocus
              disabled={false}
              type={show ? 'text' : 'password'}
              name='password'
              onChange={e => handleChange(e, state, setState)}
              value={state.password}
              error={errors.password}
              placeholder='*************************'
            />
          </Col>
        </Row>
        
        <Row className='mb-3'>
          <Form.Label htmlFor='repeatPassword' className='col-md-5'><code>*</code> Confirmer le mot de passe</Form.Label>
          <Col md={7}>
            <TextField
              disabled={false}
              type={show ? 'text' : 'password'}
              name='repeatPassword'
              onChange={e => handleChange(e, state, setState)}
              value={state.repeatPassword}
              error={errors.repeatPassword}
              placeholder='*************************'
            />
            
            <Button
              type='button'
              disabled={false}
              className='mt-2'
              variant='outline-primary'
              size='sm'
              onClick={(): void => handleShow(setShow)}
            >
              <i className={`bi bi-eye${show ? '-slash' : ''}-fill me-1`} />
              {show ? 'Masquer' : 'Afficher'}
            </Button>
          </Col>
        </Row>
        
        <Row>
          <Col md={5} />
          <Col md={7}>
            <Button
              type='submit'
              disabled={false}
              className='w-100'
            >
              Changer le mot de passe
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
  
}
