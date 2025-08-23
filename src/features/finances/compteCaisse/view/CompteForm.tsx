import type {CompteCaisse} from "../model/compteCaisseService.ts";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import {useState} from "react";
import {initCompteCaisseErrorState, initCompteCaisseState} from "../model/compteCaisseService.ts";

export default function CompteForm({ data }: { data?: CompteCaisse }) {
  
  const [compte, setCompte] = useState(initCompteCaisseState())
  const [errors/*, setErrors */] = useState(initCompteCaisseErrorState())
  
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Card.Text as='p'>Veuillez renseigner les champs (<code>*</code>) obligatoires :</Card.Text>
      
      <div className='mb-3'>
        <TextField
          required
          disabled={false}
          name='nom'
          onChange={(e): void => handleChange(e, compte, setCompte)}
          value={compte.nom}
          text='Ce champ ne peut dépasser 255 caractères.'
          label='Nom du compte'
          size='sm'
          minLength={2}
          maxLength={255}
          error={errors.nom}
        />
      </div>
      
      <Row className='mb-3'>
        <Form.Label>Devises :</Form.Label>
        <Col md={6} className='mb-1'>
          <TextField
            required
            disabled
            name='first'
            onChange={(): void => {
            }}
            value={compte.first.value}
            size='sm'
          />
        </Col>
        
        <Col md={6} className='mb-1'>
          <TextField
            required
            disabled
            name='first'
            onChange={(): void => {
            }}
            value={compte.last.value}
            size='sm'
          />
        </Col>
      </Row>
      
      <div className='mb-3'>
        <TextField
          required
          disabled={false}
          type='number'
          name='taux'
          onChange={(e): void => handleChange(e, compte, setCompte)}
          value={compte.taux}
          label='Taux'
          size='sm'
          error={errors.taux}
        />
      </div>
      
      <Button disabled={false} type='submit' size='sm' className='w-100'>
        {data ? 'Modifier ' : 'Ajouter '}
        un compte
      </Button>
    </form>
  )
  
}
