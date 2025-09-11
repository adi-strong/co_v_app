import type {SaveConsultation} from "../model/consultationService.ts";
import {Dispatch, SetStateAction} from "react";
import {TextField} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import {onConsultSignChange} from "../model/consultationService.ts";

export default function SignesVitauxFields({ state, setConsult, loader }: {
  state: SaveConsultation
  setConsult?: Dispatch<SetStateAction<SaveConsultation>>
  loader: boolean
}) {
  
  return state?.signes && (
    <Row>
      <Col md={4} className='mb-3'>
        <TextField
          required
          autoFocus
          disabled={loader}
          type='number'
          name='temperature'
          onChange={(e): void => onConsultSignChange(e, state, setConsult)}
          value={state.signes.temperature}
          label='Température °'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          required
          disabled={loader}
          type='number'
          name='poids'
          onChange={(e): void => onConsultSignChange(e, state, setConsult)}
          value={state.signes.poids}
          label='Poids (kg)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={loader}
          name='tensionArterielle'
          onChange={(e): void => onConsultSignChange(e, state, setConsult)}
          value={state.signes.tensionArterielle}
          label='Tension artérielle (Cm Hg, ...)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={loader}
          name='frequenceRespiratoire'
          onChange={(e): void => onConsultSignChange(e, state, setConsult)}
          value={state.signes.frequenceRespiratoire}
          label='Fréquence respiratoire (Pm, ...)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={loader}
          name='frequenceCardiaque'
          onChange={(e): void => onConsultSignChange(e, state, setConsult)}
          value={state.signes.frequenceCardiaque}
          label='Fréquence cardiaque (bpm, ...)'
        />
      </Col>
      
      <Col md={4} className='mb-3'>
        <TextField
          disabled={loader}
          name='saturationEnOxygene'
          onChange={(e): void => onConsultSignChange(e, state, setConsult)}
          value={state.signes.saturationEnOxygene}
          label='Fréquence cardiaque (SpO2, ...)'
        />
      </Col>
    </Row>
  )
  
}
