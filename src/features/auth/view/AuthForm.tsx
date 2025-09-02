import {useState} from "react";
import {initCredentials, onAuthSubmit} from "../model/authService.ts";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {TextField} from "../../../components";
import {handleChange} from "../../../services/form.hander.service.ts";
import {useNavigate} from "react-router-dom";
import {usePostAuthMutation} from "../model/auth.api.slice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {UserState} from "../model/auth.slice.ts";
import {useRedirectToTheApp} from "../../../hooks";

export default function AuthForm() {
  
  const [credentials, setCredentials] = useState(initCredentials())
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [authMsg, setAuthMsg] = useState<string | null>(null)
  
  const [postAuth, { isLoading }] = usePostAuthMutation()
  
  const { token } = useSelector((state: UserState) => state.auth)
  
  useRedirectToTheApp(token, navigate)
  
  return (
    <form onSubmit={e => onAuthSubmit(
      e,
      credentials,
      postAuth,
      setAuthMsg,
      dispatch
    )}>
      {authMsg &&
        <div className='mb-3'>
          <Alert variant='danger' dismissible>
            <i className='bi bi-exclamation-circle-fill'/> {authMsg}.
          </Alert>
        </div>}
      
      <Form.Group className='mb-4'>
        <TextField
          autoFocus
          disabled={isLoading}
          name='username'
          value={credentials.username}
          onChange={e => handleChange(e, credentials, setCredentials)}
          label='Username'
        />
      </Form.Group>
      
      <Form.Group className='mb-4'>
        <TextField
          disabled={isLoading}
          type='password'
          name='password'
          value={credentials.password}
          onChange={e => handleChange(e, credentials, setCredentials)}
          label='Mot de passe'
          placeholder='*********************************'
        />
      </Form.Group>
      
      <div className='text-center'>
        <Button
          disabled={isLoading}
          type='submit'
          className='w-100'
        >
          {isLoading && <Spinner className='me-1' animation='border' size='sm' />}
          {isLoading ? 'Veuillez patienter' : 'Connexion'}
        </Button>
      </div>
    </form>
  )
  
}
