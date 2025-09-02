import type {User} from "../model/userService.ts";
import {useState} from "react";
import {getUserRolesOptions, initUserErrorState, initUserState, onUserSubmit} from "../model/userService.ts";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {CheckField, MultiSelectField, SingleSelectField, TextField} from "../../../components";
import {handleChange} from "../../../services/form.hander.service.ts";
import {handleShow, onGetRandomPasswordText} from "../../../services/services.ts";
import useGetAgentsOptions from "../../personnel/agent/hooks/useGetAgentsOptions.ts";
import useSetUserData from "../hooks/useSetUserData.ts";
import {useEditUserMutation, useGetUsersQuery, usePostUserMutation} from "../model/user.api.slice.ts";
import {useNavigate} from "react-router-dom";

export default function UserForm({ data, loader, onRefresh }: { data?: User, loader: boolean, onRefresh: () => void }) {
  
  const navigate = useNavigate()
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState(initUserState())
  const [errors, setErrors] = useState(initUserErrorState())
  const [onPostNewUser, { isLoading }] = usePostUserMutation()
  const [onEditUser, { isLoading: isEditLoading }] = useEditUserMutation()
  
  useSetUserData(data, setState)
  const agentsOptions = useGetAgentsOptions()
  
  return (
    <form onSubmit={e => onUserSubmit(
      e,
      state,
      setErrors,
      data ? onEditUser : onPostNewUser,
      navigate,
      onRefresh,
      data
    )}>
      <Row>
        <Col md={6}>
          <div className='mb-3'>
            <TextField
              required
              autoFocus
              disabled={isLoading || isEditLoading || loader}
              name='username'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.username.toLowerCase()}
              text="Nom avec lequel l'utilisateur se connectera. Ce champ ne peut dépasser 255 caractères."
              label='Username'
              minLength={2}
              maxLength={255}
              error={errors.username}
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              required
              disabled={isLoading || isEditLoading || loader}
              name='fullName'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.fullName}
              text='Ce champ ne peut dépasser 255 caractères.'
              label='Nom complet'
              minLength={2}
              maxLength={255}
              error={errors.fullName}
            />
          </div>
          
          <Form.Label htmlFor='password' className='col-md-5'><code>*</code> Nouveau mot de passe</Form.Label>
          <div className='mb-3' >
            <Button
              type='button'
              disabled={(!!data)}
              className='mb-2'
              variant='outline-primary'
              size='sm'
              onClick={(): void => onGetRandomPasswordText(12, setState)}
            >
              Générer un mot de passe
            </Button>
            
            <TextField
              required
              disabled={(!!data)}
              type={show ? 'text' : 'password'}
              name='password'
              onChange={e => handleChange(e, state, setState)}
              value={state.password}
              error={errors.password}
              placeholder='*************************'
            />
          </div>
          
          <Form.Label htmlFor='passwordConfirm' className='col-md-5'>Confirmer le mot de passe</Form.Label>
          <div className='mb-3' >
            <TextField
              disabled={(!!data)}
              type={show ? 'text' : 'password'}
              name='passwordConfirm'
              onChange={e => handleChange(e, state, setState)}
              value={state.passwordConfirm}
              error={errors.passwordConfirm}
              placeholder='*************************'
            />
            
            <Button
              type='button'
              disabled={(!!data)}
              className='mt-2'
              variant='outline-primary'
              size='sm'
              onClick={(): void => handleShow(setShow)}
            >
              <i className={`bi bi-eye${show ? '-slash' : ''}-fill me-1`} />
              {show ? 'Masquer' : 'Afficher'}
            </Button>
          </div>
        </Col>
        
        <Col md={6}>
          <div className='mb-3'>
            <SingleSelectField
              disabled={isLoading || isEditLoading || loader}
              onRefresh={(): void => {}}
              options={agentsOptions()}
              value={state?.fkAgent ?? null}
              onChange={e => setState(s => ({ ...s, fkAgent: e }))}
              name='fkAgent'
              label='Agent'
              error={errors.fkAgent}
              placeholder='-- Aucun agent sélectionné --'
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              required
              disabled={isLoading || isEditLoading || loader}
              name='tel'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.tel.toLowerCase()}
              label='Numéro de téléphone'
              maxLength={255}
              error={errors.tel}
            />
          </div>
          
          <div className='mb-3'>
            <TextField
              disabled={isLoading || isEditLoading || loader}
              type='email'
              name='email'
              onChange={(e): void => handleChange(e, state, setState)}
              value={state.email}
              label='E-mail'
              maxLength={255}
              error={errors.email}
            />
          </div>
          
          <div className='mb-3'>
            <CheckField
              disabled={isLoading || isEditLoading || loader}
              name='active'
              value={state.active}
              checked={state.active}
              onChange={e => handleChange(e, state, setState)}
              error={errors.active}
              label={(<em>{state.active ? 'Désactiver' : 'Activer'}</em>)}
            />
          </div>
          
          <div className='mb-3'>
            <MultiSelectField
              required
              disabled={isLoading || isEditLoading || loader}
              options={getUserRolesOptions()}
              value={state.roles}
              onChange={e => setState(s => ({ ...s, roles: e }))}
              name='roles'
              label='Rôles / Droits utilisateur'
              error={errors.roles}
              placeholder='-- Aucun droit sélectionné --'
            />
          </div>
          
          <Button type='submit' disabled={isLoading || isEditLoading || loader} className='w-100'>
            {(isLoading || isEditLoading || loader) && <Spinner className='me-1' animation='border' size='sm' />}
            {!(isLoading || isEditLoading || loader) && data ? 'Modifier ' : !(isLoading || isEditLoading || loader) && 'Créer '}
            {(isLoading || isEditLoading || loader) ? 'Veuillez patienter' : 'un compte utilisateur'}
          </Button>
        </Col>
      </Row>
    </form>
  )
  
}
