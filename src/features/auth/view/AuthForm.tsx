import {useState} from "react";
import {initCredentials} from "../model/authService.ts";
import {Button, Form} from "react-bootstrap";
import {TextField} from "../../../components";
import {handleChange} from "../../../config/form.hander.service.ts";
import {useNavigate} from "react-router-dom";

export default function AuthForm() {
  
  const [credentials, setCredentials] = useState(initCredentials())
  
  const navigate = useNavigate()
  
  return (
    <form onSubmit={e => {
      e.preventDefault()
      navigate('/app/profil')
    }}>
      <Form.Group className='mb-4'>
        <TextField
          autoFocus
          disabled={false}
          name='username'
          value={credentials.username}
          onChange={e => handleChange(e, credentials, setCredentials)}
          label='Username'
        />
      </Form.Group>
      
      <Form.Group className='mb-4'>
        <TextField
          disabled={false}
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
          type='submit'
          className='w-100'
        >
          Connexion
        </Button>
      </div>
    </form>
  )
  
}
