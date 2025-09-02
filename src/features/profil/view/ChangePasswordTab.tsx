import type {PassType, User} from "../../user/model/userService.ts";
import {useState} from "react";
import type {ChangeProfilePasswordError} from "../model/profilService.ts";
import {initPasswordErrorState, initPasswordState, onChangePasswordSubmit} from "../model/profilService.ts";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {handleShow, onGetRandomPasswordText} from "../../../services/services.ts";
import {handleChange} from "../../../services/form.hander.service.ts";
import {TextField} from "../../../components";
import {useResetUserPasswordMutation} from "../../user/model/user.api.slice.ts";
import {useDispatch} from "react-redux";
import useSetUserPassID from "../../user/hooks/useSetUserPassID.ts";

export default function ChangePasswordTab({ data }: { data?: User }) {
  
  const dispatch = useDispatch()
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState<PassType>(initPasswordState())
  const [errors, setErrors] = useState<ChangeProfilePasswordError>(initPasswordErrorState())
  
  const [onResetPassword, { isLoading }] = useResetUserPasswordMutation()
  
  useSetUserPassID(data, setState)
  
  return (
    <>
      <Card.Title as='h4' className='text-dark mt-3'>Changer de mot de passe</Card.Title> <hr/>
      
      <form onSubmit={e => onChangePasswordSubmit(
        e,
        state,
        setErrors,
        dispatch,
        onResetPassword
      )}>
        <Row className='mb-5'>
          <Form.Label htmlFor='password' className='col-md-5'><code>*</code> Nouveau mot de passe</Form.Label>
          <Col md={7}>
            <Button
              type='button'
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
              type={show ? 'text' : 'password'}
              name='confirmPass'
              onChange={e => handleChange(e, state, setState)}
              value={state.confirmPass}
              error={errors.confirmPass}
              placeholder='*************************'
            />
            
            <Button
              type='button'
              disabled={isLoading}
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
              disabled={isLoading}
              className='w-100'
            >
              {isLoading && <Spinner className='me-1' animation='border' size='sm' />}
              {isLoading ? 'Veuillez patienter' : 'Changer le mot de passe'}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
  
}
