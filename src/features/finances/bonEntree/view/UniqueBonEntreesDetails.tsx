import type {BonEntree} from "../model/bonEntreeService.ts";
import {Card, Image} from "react-bootstrap";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import {useSelector} from "react-redux";
import type {InfoGenState} from "../../../configs/infosGen/model/infosGen.slice.ts";
import moment from "moment/moment";
import {formatDecimalNumberWithSpaces, formatNumberWithSpaces} from "../../../../services/services.ts";
import {getTotalBonEntree} from "../model/bonEntreeService.ts";

export default function UniqueBonEntreesDetails({ entry }: { entry: BonEntree }) {
  
  const date = entry?.createdAt ? entry.createdAt : new Date()
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  const { designationBonEntrees } = entry
  
  return (
    <>
      <div className='d-flex justify-content-between pt-8 px-10 pe-10'>
        <div>
          {infos && infos?.logo && (
            <Image
              fluid
              className='me-2'
              src={APP_ENTRYPOINT + infos.logo.contentUrl}
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
      
      <div className='px-10 pe-10' style={{color: '#000'}}>
        <div style={{borderBottom: '3px solid #000'}}>
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
        
        <div style={{fontSize: '0.7rem'}}>
          <p className='fw-bold mt-3'>
            <span className='me-1'>Objet</span> : <br/>
            <span className='fst-italic'>{entry?.objet?.toUpperCase() ?? ''}</span>
          </p>
          
          <p className='fw-bold mt-3'>
            <span className='me-1'>Porteur</span> : <br/>
            <span className='fst-italic'>{entry?.porteur?.toUpperCase() ?? ''}</span>
          </p>
          
          <h4 className='fw-bold text-center mt-5'>BON D'ENTRÉES N° {entry.id}</h4>
          
          <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '0.7rem'}}>
            <thead>
            <tr>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>N°</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>DÉSIGNATION</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>NOMBRE</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>P.U ({entry.devise})</th>
              <th className='text-center px-1 pe-1' style={{border: '1px solid #000'}}>PRIX TOTAL ({entry.devise})
              </th>
            </tr>
            </thead>
            
            <tbody>
            {designationBonEntrees.length > 0 && designationBonEntrees.map((d, index) => (
              <tr key={d.id}>
                <td className='text-uppercase text-center px-1 pe-1' style={{border: '1px solid #000'}}>{index + 1}</td>
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
              </tr>
            ))}
            </tbody>
            
            <tfoot>
            <tr>
              <td style={{border: '1px solid #000', fontWeight: 800}} className='px-1 pe-1' colSpan={4}>TOTAL</td>
              <td style={{border: '1px solid #000', fontWeight: 800}} className='px-1 pe-1 text-end'>
                {formatDecimalNumberWithSpaces(getTotalBonEntree(entry.designationBonEntrees))} ({entry.devise})
              </td>
            </tr>
            </tfoot>
          </table>
          
          <div className='d-flex justify-content-between mt-6'>
            <h5 className='fw-bold'>PORTEUR</h5>
            <h5 className='fw-bold'>SIGNATURE SGA</h5>
          </div>
        </div>
      </div>
    </>
  )
  
}
