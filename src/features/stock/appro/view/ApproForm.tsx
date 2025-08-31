import {ReactNode, useState} from "react";
import {initApproProdutErrorState, initApproProdutState, onApproCurrencyChange} from "../model/approService.ts";
import {Button, Card, Col, Row} from "react-bootstrap";
import {FormRequiredFieldsNoticeText, SideContent, SingleSelectField, TextField} from "../../../../components";
import ApproTab from "./ApproTab.tsx";
import useGetFournisseurOptions from "../../fournisseur/hooks/getFournisseurOptions.ts";
import {handleChange} from "../../../../services/form.hander.service.ts";
import useGetCurrencyOptions from "../../../configs/infosGen/hooks/useGetCurrencyOptions.ts";
import {handleShow} from "../../../../services/services.ts";
import ApproCartForm from "./ApproCartForm.tsx";
import SelectField from "../../../../components/forms/SelectField.tsx";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";

export default function ApproForm() {
  
  const [show, setShow] = useState<boolean>(false)
  const [state, setState] = useState(initApproProdutState())
  const [errors, setErrors] = useState(initApproProdutErrorState())
  const [taxes, setTaxes] = useState<BaseTaxeInt[]>([])
  
  const providerOptions = useGetFournisseurOptions()
  const currencyOptions = useGetCurrencyOptions()
  
  return (
    <>
      <Row>
        <Col md={6} className='mb-3'><FormRequiredFieldsNoticeText/></Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Button size='sm' onClick={(): void => handleShow(setShow)}>
            <i className='bi bi-cart-plus'/> Ajouter un produit <i className='bi bi-chevron-right'/>
          </Button>
        </Col>
      </Row>
      
      <div>
        <Card>
          <Card.Body>
            <Card.Title as='h5'><i className='bi bi-database-fill'/> Formulaire d'approvisionnement</Card.Title>
            
            <Row>
              <Col md={4} className='mb-3'>
                <SelectField
                  required
                  disabled={false}
                  name='devise'
                  value={state.devise}
                  onChange={e => onApproCurrencyChange(
                    e,
                    state,
                    setState,
                    2850,
                    setTaxes
                  )}
                  error={errors.devise}
                  options={currencyOptions()}
                  label='Devise'
                />
              </Col>
              
              <Col md={4} className='mb-3'>
                <SingleSelectField
                  required
                  disabled={false}
                  onRefresh={(): void => { }}
                  options={providerOptions()}
                  value={state?.fkFournisseur ?? null}
                  onChange={e => setState(p => ({ ...p, fkFournisseur: e }))}
                  name='fkFournisseur'
                  error={errors.fkFournisseur}
                  label='Fournisseur'
                  placeholder='-- --'
                />
              </Col>
              
              <Col md={4} className='mb-3'>
                <TextField
                  disabled={false}
                  type='date'
                  name='createdAt'
                  onChange={(e): void => handleChange(e, state, setState)}
                  value={state.createdAt}
                  label='Date'
                  error={errors.createdAt}
                  text="Si aucune date n'est renseignée le système affectera la date en cours par défaut."
                />
              </Col>
            </Row>
          </Card.Body>
          
          <ApproTab state={state} setState={setState} taxes={taxes} setTaxes={setTaxes} />
        </Card>
      </div>
      
      <SideContent
        show={show}
        onHide={(): void => handleShow(setShow)}
        title='Ajouter un produit'
        icon='cart-plus'
        children={(
          <ApproCartForm
            taux={2850}
            state={state}
            setState={setState}
            setTaxes={setTaxes}
          />
        ) as ReactNode}
      />
    </>
  )
  
}
