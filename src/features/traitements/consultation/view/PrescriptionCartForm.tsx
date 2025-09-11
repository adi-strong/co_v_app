import type {SavePrescription} from "../../prescription/model/prescriptionService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useGetProduitsQuery, useLazyGetSearchProduitsQuery} from "../../../stock/produit/model/produit.api.slice.ts";
import useGetProduitOptions from "../../../stock/produit/hooks/useGetProduitOptions.ts";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {Produit} from "../../../stock/produit/model/produitService.ts";
import toast from "react-hot-toast";
import {useState} from "react";
import {initApproProductItem, onApproProductChange} from "../../../stock/appro/model/approService.ts";
import SingleAsyncSelectField from "../../../../components/forms/SingleAsyncSelectField.tsx";
import {
  initAutrePrescriptProduit,
  initProduitPrescritItem,
  onPrescirpCartSubmit
} from "../../prescription/model/prescriptionService.ts";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {CheckField, TextAreaField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";

export default function PrescriptionCartForm(props: {
  loader: boolean
  state: SavePrescription
  setState: Dispatch<SetStateAction<SavePrescription>>
}) {
  
  const [getSearchProduits] = useLazyGetSearchProduitsQuery()
  const [cart, setCart] = useState(initProduitPrescritItem())
  const [otherCart, setOtherCart] = useState(initAutrePrescriptProduit())
  const [isSwitched, setIsSwitched] = useState<boolean>(false)
  
  const { refetch: produitsRefresh, isFetching: isProduitsFetching } = useGetProduitsQuery('LIST')
  const { loader, state, setState } = props
  
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
  
  return (
    <form
      style={{ borderRadius: 6 }}
      className='bg-secondary-subtle p-2 mb-3'
      onSubmit={e => onPrescirpCartSubmit(
        e,
        setState,
        setCart,
        setOtherCart,
        !isSwitched ? cart : undefined,
        isSwitched ? otherCart : undefined
      )}
    >
      <Row>
        <Col md={6} className='mb-3'>
          <CheckField
            inline
            type='radio'
            disabled={loader}
            name='isSwitched'
            checked={!isSwitched}
            onChange={(): void => {
              setIsSwitched(false)
              setOtherCart(initAutrePrescriptProduit())
            }}
            label='Produits internes'
          />
        </Col>
        
        <Col md={6} className='mb-3'>
          <CheckField
            inline
            type='radio'
            disabled={loader}
            name='isSwitched2'
            checked={isSwitched}
            onChange={(): void => {
              setIsSwitched(true)
              setCart(initProduitPrescritItem())
            }}
            label='Produits externes'
          />
        </Col>
      </Row>
      
      {!isSwitched && (
        <>
          <Row>
            <Col md={4} className='mb-3'>
              <SingleAsyncSelectField
                required
                disabled={isProduitsFetching || loader}
                onRefresh={async (): Promise<void> => { await produitsRefresh() }}
                options={productOptions}
                value={cart?.fkProduit ?? null}
                onChange={e => setCart(c => ({ ...c, fkProduit: e }))}
                name='fkProduit'
                label='Produit'
                placeholder='-- --'
                loadOptions={onSearchProduits}
              />
            </Col>
            
            <Col md={4} className='mb-3'>
              <Form.Label htmlFor='quantite'><code>*</code> Quantité</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  disabled={loader}
                  type='number'
                  name='quantite'
                  value={cart.quantite}
                  onChange={e => handleChange(e, cart, setCart)}
                />
                
                <InputGroup.Text>
                  {cart?.fkProduit && cart.fkProduit?.data && cart.fkProduit.data?.unite
                    ? cart.fkProduit.data.unite
                    : '—'}
                </InputGroup.Text>
              </InputGroup>
            </Col>
            
            <Col md={4} className='mb-3'>
              <TextField
                required
                disabled={loader}
                name='dosage'
                onChange={(e): void => handleChange(e, cart, setCart)}
                value={cart.dosage}
                label='Indication'
                placeholder='Posologie...'
              />
            </Col>
          </Row>
          
          <TextAreaField
            disabled={loader}
            name='comment'
            onChange={(e): void => handleChange(e, cart, setCart)}
            value={cart.comment}
            label='Commentaire(s) :'
            rows={3}
          />
        </>
      )}
      
      {isSwitched && (
        <>
          <Row>
            <Col md={4} className='mb-3'>
              <TextField
                required
                disabled={loader}
                name='product'
                onChange={(e): void => handleChange(e, otherCart, setOtherCart)}
                value={otherCart.product}
                label='Nom du produit & dosage'
                placeholder='Médicament...'
                minLength={2}
                maxLength={255}
              />
            </Col>
            
            <Col md={4} className='mb-3'>
              <TextField
                required
                disabled={loader}
                name='quantite'
                onChange={(e): void => handleChange(e, otherCart, setOtherCart)}
                value={otherCart.quantite}
                label='Quantité'
                placeholder='Quantité + Unité de consommation'
                minLength={2}
                maxLength={255}
              />
            </Col>
            
            <Col md={4} className='mb-3'>
              <TextField
                required
                disabled={loader}
                name='dosage'
                onChange={(e): void => handleChange(e, otherCart, setOtherCart)}
                value={otherCart.dosage}
                label='Indication'
                placeholder='Posologie...'
                minLength={2}
                maxLength={255}
              />
            </Col>
          </Row>
          
          <TextAreaField
            disabled={loader}
            name='comment'
            onChange={(e): void => handleChange(e, otherCart, setOtherCart)}
            value={otherCart.comment}
            label='Commentaire(s) :'
            rows={3}
          />
        </>
      )}
      
      <Button type='submit' className='mt-3 w-100' disabled={loader}>
        <i className='bi bi-cart3'/> Ajouter
      </Button>
    </form>
  )
  
}
