import type {SigneItem} from "../model/consultationService.ts";
import {useState} from "react";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {Col, Row} from "react-bootstrap";

export default function SignesVitauxFields({ signes }: { signes: SigneItem }) {
  
  const [state, setState] = useState<SigneItem>(signes)
  
  return (
    <Row>
      <Col md={4} className='mb-3'>
        <TextField
          required
          autoFocus
          disabled={false}
          type='number'
          name='temperature'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.temperature}
          label='Température °'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          required
          disabled={false}
          type='number'
          name='poids'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.poids}
          label='Poids (kg)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={false}
          name='tensionArterielle'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.tensionArterielle}
          label='Tension artérielle (Cm Hg, ...)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={false}
          name='frequenceRespiratoire'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.frequenceRespiratoire}
          label='Fréquence respiratoire (Pm, ...)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={false}
          name='frequenceCardiaque'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.frequenceCardiaque}
          label='Fréquence cardiaque (bpm, ...)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={false}
          name='saturationEnOxygene'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.saturationEnOxygene}
          label='Fréquence cardiaque (SpO2, ...)'
        />
      </Col>
    </Row>
  )
  
}
