import type {BonDeDepense} from "../model/bonDeDepensesService.ts";
import {useSelector} from "react-redux";
import type {InfoGenState} from "../../../configs/infosGen/model/infosGen.slice.ts";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import {Card, Image} from "react-bootstrap";
import {getTotalDepense, regrouperParTypeDepenses} from "../model/bonDeDepensesService.ts";
import {Fragment, ReactNode} from "react";
import {formatDecimalNumberWithSpaces, formatNumberWithSpaces} from "../../../../services/services.ts";
import moment from "moment";

export default function UniqueBonDeDepenseDetails({ expense }: { expense: BonDeDepense }) {
  
  const date = expense?.createdAt ? expense.createdAt : new Date()
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  
  return (
    <>
      <div className='d-flex justify-content-between pt-8 px-10 pe-10'>
        <div>
          {infos && infos?.logo && (
            <Image
              fluid
              className='me-2'
              src={APP_ENTRYPOINT+infos.logo.contentUrl}
              width={120}
              height={120}
              alt=''
            />
          )}
        </div>
        
        <div>
          <Card.Text as='p' className='text-capitalize'>
            Kinshasa, le {moment(date).format('DD/MM/YYYY')}
          </Card.Text>
          
          {infos && <h5 className='text-uppercase fw-bold'>{infos.nom}</h5>}
        </div>
      </div>
      
      <div className='px-10 pe-10' style={{ color: '#000' }}>
        <div style={{ borderBottom: '3px solid #000' }}>
          <h2 className='fw-bold text-center mt-5'>SECRÉTARIAT GÉNÉRAL</h2>
          <h6 className='text-center'>Administration / Logistique</h6>
          
          {infos && infos?.address && <div className='text-center text-secondary'><small>{infos.address}</small></div>}
          {infos && (
            <>
              <div className='text-center text-secondary'>
                <small>
                  {infos.tel}
                  {infos?.tel2 && ` — ${infos.tel2}`}
                </small>
              </div>
              
              <div className='text-center text-secondary text-lowercase'>
                <small>
                  {infos?.email && infos.email}
                  {infos?.email && infos?.email2 ? ` — ${infos.email2}` : infos?.email2}
                </small>
              </div>
            </>
          )}
        </div>
        
        <div style={{ fontSize: '0.7rem' }}>
          <p className='fw-bold mt-3'>
            <span className='me-1'>Objet</span> : <br/>
            <span className='fst-italic'>{expense?.objet?.toUpperCase() ?? ''}</span>
          </p>
          
          <p className='fw-bold mt-3'>
            <span className='me-1'>Demandeur</span> : <br/>
            <span className='fst-italic'>{expense?.demandeur?.toUpperCase() ?? ''}</span>
          </p>
          
          <h4 className='fw-bold text-center mt-5'>BON DE DÉPENSES URGENTES N° {expense.id}</h4>
          
          <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '0.7rem'}}>
            <thead>
            <tr>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>N°</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>TYPE</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>DÉSIGNATION</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>NOMBRE</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>P.U ({expense.devise})</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>PRIX TOTAL ({expense.devise})</th>
            </tr>
            </thead>
            
            <tbody>
            {expense.designationBonDeDepenses.length > 0
              && regrouperParTypeDepenses(expense.designationBonDeDepenses).map((b, i) =>
                <Fragment key={i}>
                  <tr>
                    <th
                      rowSpan={b.designations.length > 0 ? b.designations.length + 1 : undefined}
                      className='text-center px-1 pe-1'
                      style={{border: '1px solid #000'}}
                    >{(i + 1)}</th>
                    <th
                      rowSpan={b.designations.length > 0 ? b.designations.length + 1 : undefined}
                      className='text-center px-1 pe-1'
                      style={{border: '1px solid #000'}}
                    >{b.type}</th>
                  </tr>
                  
                  {b.designations.length > 0 && b.designations.map((d, j) =>
                    <tr key={j}>
                      <td className='text-uppercase text-center px-1 pe-1' style={{border: '1px solid #000'}}>
                        {d.libelle}
                      </td>
                      <td className='text-uppercase text-center px-1 pe-1' style={{border: '1px solid #000'}}>
                        {formatNumberWithSpaces(d.qte)}
                      </td>
                      <td className='text-uppercase text-end px-1 pe-1' style={{border: '1px solid #000'}}>
                        {formatDecimalNumberWithSpaces(d.prixUnitaire)}
                      </td>
                      <td className='text-uppercase text-end px-1 pe-1' style={{border: '1px solid #000'}}>
                        {formatDecimalNumberWithSpaces((
                          Number(d.prixUnitaire) * Number(d.qte)
                        ))}
                      </td>
                    </tr>) as ReactNode}
                </Fragment>)}
            </tbody>
            
            <tfoot>
            <tr>
              <td style={{border: '1px solid #000', fontWeight: 800}} className='px-1 pe-1' colSpan={5}>TOTAL</td>
              <td style={{border: '1px solid #000', fontWeight: 800}} className='px-1 pe-1 text-end'>
                {formatDecimalNumberWithSpaces(getTotalDepense(expense.designationBonDeDepenses))} ({expense.devise})
              </td>
            </tr>
            </tfoot>
          </table>
          
          <div className='d-flex justify-content-between mt-6'>
            <h5 className='fw-bold'>BÉNÉFICIAIRE</h5>
            <h5 className='fw-bold'>SIGNATURE SGA</h5>
          </div>
        </div>
      </div>
    </>
  )
  
}
