import type {Appro} from "../model/approService.ts";
import {useSelector} from "react-redux";
import type {InfoGenState} from "../../../configs/infosGen/model/infosGen.slice.ts";
import {Col, Image, Row, Table} from "react-bootstrap";
import type {ReactNode} from "react";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import moment from "moment";
import {formatDecimalNumberWithSpaces, formatNumberWithSpaces} from "../../../../services/services.ts";
import {useState} from "react";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";
import useSetApproTaxesData from "../hooks/useSetApproTaxesData.ts";
import {getApproSubTotal, getApproSubTotalWithDiscount, getApproTaxTotal} from "../model/approService.ts";
import useGetApproTotalAmount from "../hooks/useGetApproTotalAmount.ts";
import type {CompteCaisseState} from "../../../finances/compteCaisse/model/compteCaisse.slice.ts";
import ShowApproItem from "./ShowApproItem.tsx";

export default function ShowApproToPrint({ appro }: { appro: Appro }) {
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  const {
    id,
    taux,
    remise,
    devise,
    createdAt,
    fkFournisseur,
    approProduits,
  } = appro
  
  const {
    nomCommercial,
    nom,
    abreviation,
    adresse,
    tel,
    email,
  } = fkFournisseur
  
  const [taxes, setTaxes] = useState<BaseTaxeInt[]>([])
  
  useSetApproTaxesData(approProduits, setTaxes)
  
  const subTotal: number = getApproSubTotal(appro.approProduits)
  const subTotalWithDiscount: number = getApproSubTotalWithDiscount(subTotal, Number(remise))
  const taxesAmount: number = getApproTaxTotal(taxes)
  const totalAmount = useGetApproTotalAmount(subTotalWithDiscount, taxesAmount)
  
  return (
    <>
      <Row>
        <Col sm={9} className='mb-3'>
          {infos && (
            <>
              <h4 className='fw-bold text-uppercase'>{infos.nom}</h4>
              {infos?.address && <div className='white-space'>{infos.address}</div>}
              Téléphone : {infos.tel} {infos?.tel2 && `— ${infos.tel2}`} <br/>
              E-mail :
              <span className='mx-1 text-lowercase'>{infos?.email && infos.email} {infos?.tel2 && `— ${infos.tel2}`}</span>
            </>
          ) as ReactNode}
        </Col>
        
        <Col sm={3} className='mb-3'>
          {infos && infos.logo && (
            <Image
              fluid
              roundedCircle
              src={APP_ENTRYPOINT + infos.logo.contentUrl}
              alt='logo'
            />
          ) as ReactNode}
        </Col>
      </Row>
      
      <Row style={{ fontSize: '0.7rem' }}>
        <Col sm={5} className='mb-3'>
          <div className='bg-light p-2'>
            <Row>
              <Col sm={7} className='mb-2'>N°</Col>
              <Col sm={5} className='mb-2'>: {formatNumberWithSpaces(id)}</Col>
              
              <Col sm={7} className='mb-2'>Date</Col>
              <Col sm={5} className='mb-2'>: {createdAt ? moment(createdAt).format('DD/MM/YY') : '—'}</Col>
              
              <Col sm={7} className='mb-2'>Devise</Col>
              <Col sm={5} className='mb-2'>: {`(${devise})`}</Col>
              
              <Col sm={7}>Taux</Col>
              <Col sm={5}>: {formatDecimalNumberWithSpaces(taux)}</Col>
            </Row>
          </div>
        </Col>
        
        <Col sm={4}/>
        
        <Col sm={3} className='mb-3'>
          <h5 className='fw-bold'>Fournisseur</h5>
          <h6 className='fw-bold text-uppercase'>{nomCommercial} {abreviation && `(${abreviation})`}</h6>
          
          <div className='fst-italic'>
            {nom && nom} <br/>
            {adresse && <div className='white-space'>{adresse}</div>}
            Tél : {tel} <br/>
            E-mail : <span className='text-lowercase'>{email ? email : '—'}</span>
          </div>
        </Col>
      </Row>
      
      <Table hover className='mt-8' style={{ fontSize: '0.7rem' }}>
        <thead>
        <tr>
          <th style={{ borderTop: '2px solid blue', fontSize: '0.7rem' }} className='fw-bold'>Produit</th>
          <th style={{ borderTop: '2px solid blue', fontSize: '0.7rem' }} className='fw-bold'>Qté.</th>
          <th style={{ borderTop: '2px solid blue', fontSize: '0.7rem' }} className='fw-bold'>Unité</th>
          <th style={{ borderTop: '2px solid blue', fontSize: '0.7rem' }} className='fw-bold'>P.U. HT {`(${devise})`}</th>
          <th style={{ borderTop: '2px solid blue', fontSize: '0.7rem' }} className='fw-bold'>% TVA</th>
          <th style={{ borderTop: '2px solid blue', fontSize: '0.7rem' }} className='fw-bold'>Total HT {`(${devise})`}</th>
        </tr>
        </thead>
        
        <tbody>
        {approProduits.length > 0 && approProduits.map(p => (
          <ShowApproItem key={p.id} product={p} />
        ))}
        </tbody>
      </Table>
      
      <Row>
        <Col sm={6} className='mb-2'>
          <Table bordered className='text-center' style={{ fontSize: '0.7rem' }}>
            <thead>
            <tr>
              <td>Base HT</td>
              <td>% TVA</td>
              <td>Montant TVA</td>
            </tr>
            </thead>
            
            <tbody>
            {taxes.length > 0 && taxes.map((t, index) => (
              <tr key={index}>
                <td>{formatDecimalNumberWithSpaces(Number(t.baseHT))}</td>
                <td>{Number(t.tva).toFixed(1)}</td>
                <td>{formatDecimalNumberWithSpaces(Number(t.amount))}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Col>
        
        <Col sm={6} className='mb-2'>
          <Table striped bordered className='fw-bold' style={{ fontSize: '0.7rem' }}>
            <tbody>
            <tr>
              <th className='text-dark'>Total HT</th>
              <th className='text-end text-dark'>{formatDecimalNumberWithSpaces(subTotal)} {`(${devise})`}</th>
            </tr>
            
            <tr>
              <th className='text-dark'>Total TVA</th>
              <th className='text-end text-dark'>{formatDecimalNumberWithSpaces(taxesAmount)} {`(${devise})`}</th>
            </tr>
            
            <tr>
              <th className='text-dark'>% Remise</th>
              <th className='text-end text-dark'>{Number(remise).toFixed(1)} %</th>
            </tr>
            
            <tr>
              <th className='text-primary'>Total TTC</th>
              <th className='text-end text-primary'>
                {formatDecimalNumberWithSpaces(totalAmount())} {`(${devise})`}
              </th>
            </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
  
}
