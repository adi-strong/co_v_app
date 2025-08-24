import {Link} from "react-router-dom";
import moment from "moment";
import type {FactureConsultation} from "../model/factureConsultationService.ts";

export default function FactureConsultItem({ facture }: { facture: FactureConsultation }) {
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/factures-produits/${facture.id}`}>
            {facture.id}
          </Link>
        </td>
        
        <td>{facture?.fkConsultation.fkPatient.fullName ? facture.fkConsultation.fkPatient.fullName.toUpperCase() : '—'}</td>
        <td>{facture?.releasedAt ? moment(facture.releasedAt).format('DD/MM/YY') : '—'}</td>
      </tr>
    </>
  )
  
}
