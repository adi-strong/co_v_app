import type {SaveAppro} from "../model/approService.ts";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import {CheckField, TextField} from "../../../../components";
import {useState} from "react";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import {
  addOnApproCartSubmit,
  initApproProductItem,
  onApproOtherQtyChange, onApproPriceChange,
  onApproPrixHTChange, onApproProductChange, onApproQtyChange, onApproRealQtyChange,
  onApproTaxeChange
} from "../model/approService.ts";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";
import {useGetProduitsQuery, useLazyGetSearchProduitsQuery} from "../../produit/model/produit.api.slice.ts";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import SingleAsyncSelectField from "../../../../components/forms/SingleAsyncSelectField.tsx";
import useGetProduitOptions from "../../produit/hooks/useGetProduitOptions.ts";

export default function ApproCartForm({ taux, state, setState, setTaxes, loader }: {
  state: SaveAppro
  setState: Dispatch<SetStateAction<SaveAppro>>
  taux: number
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>
  loader: boolean
}) {
  
  const [product, setProduct] = useState<SingleValue<SelectOptionType>>(null)
  const [data, setData] = useState(initApproProductItem())
  const [isBy, setIsBy] = useState<boolean>(false)
  const [getSearchProduits] = useLazyGetSearchProduitsQuery()
  
  const { refetch: produitsRefresh, isFetching: isProduitsFetching } = useGetProduitsQuery('LIST')
  
  const productOptions = useGetProduitOptions()
  
  const onSearchProduits = async (keywords: string): Promise<any> => {
    const products: SelectOptionType[] = []
    try {
      const { data, error }: JsonLdApiResponseInt<Produit[]> = await getSearchProduits(keywords)
      if (error && error?.data && error.data?.detail) toast.error(error.data.detail)
      if (data && data.length > 0) data.forEach(({ id, nom, fkUnite }: Produit): void => {
        const data: { uniteID: number; unite: string | null } = {
          uniteID: fkUnite ? fkUnite.id : 0,
          unite: fkUnite ? fkUnite.nom : null,
        }
        products.push({
          label: nom.toUpperCase(),
          value: nom.toUpperCase(),
          data,
        })
      })
    } catch (e) { toast.error(e?.message ?? 'Une erreur est survenue.') }
    
    return products
  }
  
  const onReset = (): void => {
    setIsBy(false)
    setProduct(null)
    setData(initApproProductItem())
  }
  
  return (
    <form onSubmit={e => addOnApproCartSubmit(
      e,
      state,
      setState,
      data,
      setData,
      setProduct,
      setIsBy,
      taux,
      setTaxes
    )}>
      <div className='mb-3'>
        <SingleAsyncSelectField
          required
          disabled={isProduitsFetching || loader}
          onRefresh={async (): Promise<void> => { await produitsRefresh() }}
          options={productOptions}
          value={product}
          onChange={e => onApproProductChange(e, setProduct, setData)}
          name='product'
          label='Produit'
          placeholder='-- Aucun produit sélectionné --'
          loadOptions={onSearchProduits}
        />
      </div>
      
      <div className='mb-3'>
        <CheckField
          inline
          disabled={loader}
          name='isBy'
          value={isBy}
          checked={isBy}
          onChange={(): void => onApproOtherQtyChange(isBy, setIsBy, setData)}
          label='Autres spécifications'
        />
      </div>
      
      <Row>
        {!isBy && (
          <>
            <Col md={6} className='mb-3'>
              <TextField
                required
                disabled={loader}
                type='number'
                name='prixHt'
                onChange={(e): void => onApproPrixHTChange(e, setData)}
                value={data.prixHt}
                label='P.U HT'
              />
            </Col>
            
            <Col md={6} className='mb-3'>
              <TextField
                disabled={loader}
                type='number'
                name='taxe'
                onChange={(e): void => onApproTaxeChange(e, setData)}
                value={data.tva}
                label='% TVA'
              />
            </Col>
            
            <Col sm={12} className='mb-3'>
              <TextField
                required
                disabled={data.tva > 0}
                type='number'
                name='prixTtc'
                onChange={(e): void => handleChange(e, data, setData)}
                value={data.tva > 0 ? data.prixTtc.toFixed(2) : data.prixTtc}
                label='Prix TTC'
              />
            </Col>
          </>
        ) as ReactNode}
        
        {!isBy && (
          <div className='mb-3'>
            <Form.Label htmlFor='quantite'><code>*</code> Quantité</Form.Label>
            <InputGroup>
              <TextField
                required
                disabled={loader}
                type='number'
                name='quantite'
                onChange={(e): void => handleChange(e, data, setData)}
                value={data.quantite}
              />
              <InputGroup.Text>
                ({product && product?.data && product.data?.unite ? product.data.unite : '—'})
              </InputGroup.Text>
            </InputGroup>
          </div>
        ) as ReactNode}
        
        {isBy && (
          <>
            <div className='mb-3'>
              <TextField
                required
                autoFocus
                disabled={loader}
                name='unite'
                onChange={(e): void => handleChange(e, data, setData)}
                value={data?.unite ?? ''}
                label='Spécification'
                text='par exemple : Carton / Autres ...'
              />
            </div>
            
            <div className='mb-3'>
              <Form.Label htmlFor='qty'>Quantité par {data?.unite ?? '—'}</Form.Label>
              <InputGroup>
                <InputGroup.Text>1 <span
                  className='text-capitalize mx-1'>{data?.unite ?? '—'}</span> =</InputGroup.Text>
                <TextField
                  required
                  disabled={loader}
                  type='number'
                  name='realQty'
                  onChange={(e): void => onApproRealQtyChange(e, data, setData)}
                  value={data?.realQty ?? 0}
                  className='text-center'
                />
                <InputGroup.Text>
                  ({product && product?.data && product.data?.unite ? product.data.unite : '—'})
                </InputGroup.Text>
              </InputGroup>
            </div>
            
            <div className='mb-3'>
              <TextField
                required
                disabled={loader}
                type='number'
                name='qty'
                onChange={(e): void => onApproQtyChange(e, setData)}
                value={data?.qty ?? 0}
                label={<>Quantité de la spécification {data?.unite && `(${data.unite})`}</>}
              />
            </div>
            
            <Row>
              <Col md={6} className='mb-3'>
                <TextField
                  required
                  disabled={loader}
                  type='number'
                  name='price'
                  onChange={(e): void => onApproPriceChange(e, setData)}
                  value={data.price}
                  label={<>Prix U. / {data?.unite && `(${data.unite})`}</>}
                />
              </Col>
              
              <Col md={6} className='mb-3'>
                <TextField
                  required
                  disabled={loader}
                  type='number'
                  name='prixHt'
                  onChange={(e): void => onApproPrixHTChange(e, setData)}
                  value={data.prixHt}
                  label={<>
                    P.U HT {'/ '}
                    {data?.unite && `(${product && product?.data && product.data?.unite ? product.data.unite : '—'})`}
                  </>}
                />
              </Col>
              
              <Col md={6} className='mb-3'>
                <TextField
                  disabled={loader}
                  type='number'
                  name='taxe'
                  onChange={(e): void => onApproTaxeChange(e, setData)}
                  value={data.tva}
                  label='% TVA'
                />
              </Col>
              
              <Col sm={6} className='mb-3'>
                <TextField
                  required
                  disabled={data.tva > 0}
                  type='number'
                  name='prixTtc'
                  onChange={(e): void => handleChange(e, data, setData)}
                  value={data.tva > 0 ? data.prixTtc.toFixed(2) : data.prixTtc}
                  label='Prix TTC'
                />
              </Col>
            </Row>
            
            <div className='mb-3'>
              <Form.Label htmlFor='quantite'><code>*</code> Quantité</Form.Label>
              <InputGroup>
                <TextField
                  required
                  disabled
                  type='number'
                  name='quantite'
                  onChange={(e): void => handleChange(e, data, setData)}
                  value={data.quantite}
                />
                <InputGroup.Text>
                  ({product && product?.data && product.data?.unite ? product.data.unite : '—'})
                </InputGroup.Text>
              </InputGroup>
            </div>
          </>
        ) as ReactNode}
      </Row>
      
      <div className='mb-3'>
        <TextField
          disabled={loader}
          type='date'
          name='datePeremption'
          onChange={(e): void => handleChange(e, data, setData)}
          value={data.datePeremption}
          label='Date de péremption'
        />
      </div>
      
      <Button disabled={loader} type='button' variant='secondary' onClick={onReset} className='mb-1 w-100'>
        <i className='bi bi-trash'/> Effacer
      </Button>
      
      <Button disabled={loader} type='submit' className='w-100'>
        <i className='bi bi-plus'/> Ajouter
      </Button>
    </form>
  )
  
}
