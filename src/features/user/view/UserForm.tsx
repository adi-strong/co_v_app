import type {User} from "../model/userService.ts";
import {useState} from "react";
import {getUserRolesOptions, initUserErrorState, initUserState} from "../model/userService.ts";
import {Button, Col, Form, Row} from "react-bootstrap";
import {CheckField, MultiSelectField, SingleSelectField, TextField} from "../../../components";
import {handleChange} from "../../../config/form.hander.service.ts";
import {handleShow, onGetRandomPasswordText} from "../../../services/services.ts";
import useGetAgentsOptions from "../../personnel/agent/hooks/useGetAgentsOptions.ts";

export default function UserForm({ data }: { data?: User }) {
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState(initUserState())
  const [errors/*, setErrors */] = useState(initUserErrorState())
  
  const agentsOptions = useGetAgentsOptions()
  
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Row>
        <Col md={6}>
          <div className='mb-3'>
            <TextField
              required
              autoFocus
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
              options={getUserRolesOptions()}
              value={state.roles}
              onChange={e => setState(s => ({ ...s, roles: e }))}
              name='roles'
              label='Rôles / Droits utilisateur'
              error={errors.roles}
              placeholder='-- Aucun droit sélectionné --'
            />
          </div>
          
          <Button type='submit' disabled={false} className='w-100'>
            {data ? 'Modifier ': 'Créer '}
            un compte utilisateur
          </Button>
        </Col>
      </Row>
    </form>
  )
  
}
