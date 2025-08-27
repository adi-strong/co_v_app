import {Button, Col, Row} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {handleShow} from "../../../../services/services.ts";
import {SideContent, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import ComptesData from "./ComptesData.tsx";
import {getComptesCaissesFakeData} from "../model/compteCaisseService.ts";
import CompteForm from "./CompteForm.tsx";

export default function ComptesList() {
  
  const [show, setShow] = useState<boolean>(false)
  const [search, setSearch] = useState<{ keyword: string }>({ keyword: '' })
  const [comptes, setComptes] = useState(getComptesCaissesFakeData)
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  
  return (
    <>
      <div className='pe-4 px-4 pt-5'>
        <Row>
          <Col md={6} className='mb-1'>
            <h4 className='mb-1'>
              Comptes
              
              <Button variant='link' className='mx-5' title='Nouveau compte' onClick={(): void => handleShow(setShow)}>
                <i className='bi bi-plus'/> Nouveau
              </Button>
            </h4>
          </Col>
          
          <Col md={6} className='mb-1 text-md-end'>
            <form className='row' onSubmit={e => e.preventDefault()}>
              <Col md={6} className='mb-1'>
                <TextField
                  disabled={false}
                  name='keyword'
                  onChange={e => handleChange(e, search, setSearch)}
                  value={search.keyword}
                  size='sm'
                />
              </Col>
              
              <Col md={6} className='mb-1'>
                <Button type='submit' disabled={false} variant='outline-primary' className='w-100' size='sm'>
                  Rechercher des comptes
                </Button>
              </Col>
            </form>
          </Col>
        </Row>
      </div>
      
      <ComptesData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        comptes={comptes}
        setComptes={setComptes}
      />
      
      <SideContent
        show={show}
        onHide={(): void => handleShow(setShow)}
        title='Nouveau compte'
        icon='plus'
        children={(<CompteForm/>) as ReactNode}
      />
    </>
  )
  
}
