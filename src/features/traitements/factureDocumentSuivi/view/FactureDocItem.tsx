import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {FactureDocumentSuivi} from "../model/factureDocumentSuiviService.ts";

export default function FactureDocItem({ facture }: { facture: FactureDocumentSuivi }) {
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/factures-produits/${facture.id}`}>
            {facture.id}
          </Link>
        </td>
        
        <td>{facture?.fkDocSuivi.fkPatient.fullName ? facture.fkDocSuivi.fkPatient.fullName.toUpperCase() : '—'}</td>
        <td>{facture?.releasedAt ? moment(facture.releasedAt).format('DD/MM/YY') : '—'}</td>
      </tr>
    </>
  )
  
}
