import type {LotProduit} from "../model/lotProduitService.ts";
import {useState} from "react";
import {
  initLotProduitErrorState,
  initLotProduitState, onPatchLotProduitSubmit,
  onPrixHTLotProdChange,
  onTvaLotProdChange
} from "../model/lotProduitService.ts";
import {FormRequiredFieldsNoticeText, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {useEditLotProduitMutation} from "../model/lotProduit.api.slice.ts";
import {Button, Spinner} from "react-bootstrap";
import useSetLotProduitData from "../hooks/useSetLotProduitData.ts";

export default function LotProdForm(props: {
  data: LotProduit
  onRefresh: () => void
  onHide?: () => void
}) {
  
  const [prod, setProd] = useState(initLotProduitState())
  const [errors, setErrors] = useState(initLotProduitErrorState())
  const [onEditLotProduct, { isLoading }] = useEditLotProduitMutation()
  
  const { data, onRefresh, onHide } = props
  
  useSetLotProduitData(data, setProd)
  
  return (
    <form onSubmit={e => onPatchLotProduitSubmit(
      e,
      prod,
      setErrors,
      onEditLotProduct,
      onRefresh,
      onHide
    )}>
      <FormRequiredFieldsNoticeText/>
      
      <div className='mb-3'>
        <TextField
          required
          autoFocus
          disabled={isLoading}
          type='number'
          name='prixHt'
          onChange={(e): void => onPrixHTLotProdChange(e, setProd)}
          value={prod.prixHt}
          label={`Prix HT (${data.devise})`}
          error={errors.prixHt}
        />
      </div>
      
      <div className='mb-3'>
        <TextField
          autoFocus
          disabled={isLoading}
          type='number'
          name='tva'
          onChange={(e): void => onTvaLotProdChange(e, setProd)}
          value={prod.tva}
          label='TVA'
          error={errors.tva}
        />
      </div>
      
      <div className='mb-3'>
        <TextField
          required
          disabled={prod.tva > 0 || isLoading}
          type='number'
          name='prixTtc'
          onChange={(e): void => handleChange(e, prod, setProd)}
          value={prod.prixTtc}
          label={`Prix TTC (${data.devise})`}
          error={errors.prixTtc}
        />
      </div>
      
      <Button disabled={isLoading} type='submit' className='w-100 mt-4'>
        {isLoading && <Spinner className='me-1' animation='border' size='sm' />}
        {isLoading ? 'Veuillez patienter' : 'Modifier'}
      </Button>
    </form>
  )
  
}
