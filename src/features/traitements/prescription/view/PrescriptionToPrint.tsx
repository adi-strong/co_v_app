import {Card, Col, Image, Row} from "react-bootstrap";
import type {Prescription} from "../model/prescriptionService.ts";
import avatar from '../../../../assets/images/placeholder/placeholder-4by3.svg';
import {useSelector} from "react-redux";
import type {InfoGenState} from "../../../configs/infosGen/model/infosGen.slice.ts";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import {formatNumberWithSpaces, getMediumMediaImage} from "../../../../services/services.ts";
import moment from "moment";

export default function PrescriptionToPrint({ prescription }: { prescription: Prescription }) {
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  const {
    fkAgent,
    produitPrescrits,
    autresProduits,
    releasedAt,
    fkPatient
  } = prescription
  
  return (
    <>
      <Row>
        <Col sm={4}>
          <Card.Title as='h5' className='text-primary mb-0'>
            Dr. <span className='text-uppercase'>{fkAgent ? fkAgent?.fullName ?? fkAgent.nom : '—'}</span>
          </Card.Title>
          <span className='text-uppercase'>{fkAgent && fkAgent?.fkFonction ? fkAgent.fkFonction.nom : '—'}</span> <br/>
          <b>Tél</b> :
          <span className='mx-1 text-uppercase'>{fkAgent && fkAgent?.tel ? fkAgent.tel : '—'}</span> <br/>
          <b>E-mail</b> : <span className='text-lowercase fst-italic text-decoration-underline text-primary'>
          {fkAgent && fkAgent?.email ? fkAgent.email : '—'}</span>
        </Col>
        
        <Col sm={4} className='text-center'>
          <Image
            roundedCircle
            width={100}
            height={100}
            src={(infos && infos?.logo ? `${APP_ENTRYPOINT+getMediumMediaImage(infos.logo.contentUrl)}` : avatar) as string}
            alt='logo'
          />
        </Col>
        
        <Col sm={4} className='text-center'>
          <Card.Title as='h5' className='text-primary mb-0'>
            <span className='text-uppercase'>{infos ? infos.nom : '—'}</span>
          </Card.Title>
          <b>Adresse</b> :
          <div className='white-space'>{infos && infos?.address ? infos.address : '—'}</div>
          
          <b>Tél</b> : <span>{infos ? infos?.tel : '—'}</span> <br/>
          <b>E-mail</b> : <span className='text-lowercase'>{infos && infos?.email ? infos.email : '—'}</span>
        </Col>
      </Row>
      
      <hr className='mt-7 border-2 text-primary'/>
      
      <Row className='mt-7'>
        <Col sm={6} className='mb-3'>
          <Card.Title as='h4' className='text-dark'><i className='bi bi-capsule-pill'/> Ordonnance Médicale</Card.Title>
        </Col>
        
        <Col sm={6} className='mb-3 text-end'>
          Le {releasedAt ? moment(releasedAt).format('DD MMMM YYYY') : '—'}
        </Col>
      </Row>
      
      <div className='text-dark pt-8'>
        <h5 className='text-uppercase'>{fkPatient ? fkPatient?.fullName ?? fkPatient.nom : '—'}</h5>
        <p className='mb-8'>{fkPatient ? `${formatNumberWithSpaces(fkPatient.age)} an(s)` : '—'}</p>
        
        {produitPrescrits.length > 0 && produitPrescrits.map((p, index) => (
          <p key={index}>
            - {p.fkProduit.nom} : ({p.quantite} {p.fkProduit?.fkUnite?.nom}) — {p.dosage}
          </p>
        ))}
        
        {autresProduits.length > 0 && autresProduits.map((p, index) => (
          <p key={index}>
            - {p.product} : {p.quantite} — {p.dosage}
          </p>
        ))}
      </div>
    </>
  )
  
}
