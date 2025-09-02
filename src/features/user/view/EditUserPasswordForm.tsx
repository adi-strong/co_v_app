import {useState} from "react";
import {useResetUserPasswordMutation} from "../model/user.api.slice.ts";
import useSetUserPassID from "../hooks/useSetUserPassID.ts";
import type {PassType, User} from "../model/userService.ts";
import type {ChangeProfilePasswordError} from "../../profil/model/profilService.ts";
import {
  initPasswordErrorState,
  initPasswordState,
  onChangePasswordSubmit2
} from "../../profil/model/profilService.ts";
import {Button, Form, Spinner} from "react-bootstrap";
import {handleShow, onGetRandomPasswordText} from "../../../services/services.ts";
import {TextField} from "../../../components";
import {handleChange} from "../../../services/form.hander.service.ts";
import {useDispatch} from "react-redux";

export default function EditUserPasswordForm({ data, onHide }: { data: User, onHide: () => void }) {
  
  const dispatch = useDispatch()
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState<PassType>(initPasswordState())
  const [errors, setErrors] = useState<ChangeProfilePasswordError>(initPasswordErrorState())
  
  const [onResetPassword, { isLoading }] = useResetUserPasswordMutation()
  
  useSetUserPassID(data, setState)
  
  return (
    <form onSubmit={e => onChangePasswordSubmit2(
      e,
      state,
      setErrors,
      onResetPassword,
      onHide
    )}>
      <div className='mb-5'>
        <Form.Label htmlFor='password'><code>*</code> Nouveau mot de passe</Form.Label> <br/>
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
      </div>
      
      <div className='mb-3'>
        <Form.Label htmlFor='repeatPassword'><code>*</code> Confirmer le mot de passe</Form.Label>
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
          <i className={`bi bi-eye${show ? '-slash' : ''}-fill me-1`}/>
          {show ? 'Masquer' : 'Afficher'}
        </Button>
      </div>
      
      <Button
        type='submit'
        disabled={isLoading}
        className='w-100'
      >
        {isLoading && <Spinner className='me-1' animation='border' size='sm'/>}
        {isLoading ? 'Veuillez patienter' : 'Changer le mot de passe'}
      </Button>
    </form>
  )
  
}
