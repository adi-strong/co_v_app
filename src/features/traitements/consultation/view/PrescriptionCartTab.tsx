import type {SavePrescription} from "../../prescription/model/prescriptionService.ts";
import type {Dispatch, SetStateAction} from "react";
import {Button} from "react-bootstrap";
import {
  onRemoveAutrePrescriptProduct,
  onRemovePrescriptProductItem
} from "../../prescription/model/prescriptionService.ts";

export function PrescriptionCartTab({ state, setState, loader }: {
  state: SavePrescription,
  setState: Dispatch<SetStateAction<SavePrescription>>
  loader: boolean
}) {
  
  const { produitItems, autresProduits } = state
  
  return (
    <>
      <table className='w-100'>
        <thead>
        <tr>
          <th className='border-light-subtle bg-light-subtle border-1 px-1 pe-1' width={400}>
            <Button
              disabled={loader}
              variant='link'
              size='sm'
              className='text-danger me-1 p-0'
              onClick={(): void => setState(s => ({ ...s, produitItems: [], autresProduits: [] }))}
            >
              <i className='bi bi-trash'/>
            </Button>
            Produit
          </th>
          
          <th className='border-light-subtle bg-light-subtle border-1 px-1 pe-1'>Indication</th>
        </tr>
        </thead>
        
        <tbody>
        {produitItems.length > 0 && produitItems.map((p, index) => (
          <tr key={index}>
            <td className='border-1 border-light-subtle px-1 pe-1'>
              <Button
                type='button'
                disabled={loader}
                onClick={(): void => onRemovePrescriptProductItem(index, setState)}
                variant='link'
                className='p-0 me-1 text-danger'
              >
                <i className='bi bi-trash3'/>
              </Button>
              {p?.fkProduit ? p.fkProduit.value : '-'}
            </td>
            <td className='border-1 border-light-subtle px-1 pe-1'>
              ({p.quantite} {p?.fkProduit && p.fkProduit?.data && p.fkProduit.data?.unite
                ? `${p.fkProduit.data.unite}) — `
                : '—'}
              {p.dosage}
            </td>
          </tr>
        ))}
        
        {autresProduits.length > 0 && autresProduits.map((p, index) => (
          <tr key={index}>
            <td className='border-1 border-light-subtle px-1 pe-1'>
              <Button
                type='button'
                disabled={loader}
                onClick={(): void => onRemoveAutrePrescriptProduct(index, setState)}
                variant='link'
                className='p-0 me-1 text-danger'
              >
                <i className='bi bi-trash3'/>
              </Button>
              {p.product}
            </td>
            <td className='border-1 border-light-subtle px-1 pe-1'>{p.dosage}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
  
}
