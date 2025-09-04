import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, TextField} from "../../../components";
import {getgetCategorieLitActionsOptions} from "../../traitements/categorieLit/model/categorieLitService.ts";
import type {RendezVous} from "../model/rendezVousService.ts";
import RdvData from "./RdvData.tsx";
import {Button, Col} from "react-bootstrap";
import {handleChange} from "../../../services/form.hander.service.ts";

export default function RdvList({ rdvs, setRdvs, onRefresh, isFetching, loader }: {
  rdvs: RendezVous[]
  setRdvs: Dispatch<SetStateAction<RendezVous[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')
  const [search, setSearch] = useState<{ start: string, end: '', nom: string }>({
    end: '',
    nom: '',
    start: '',
  })
  
  return (
    <>
      <div className='text-md-end'>
        <form className='row' onSubmit={e => e.preventDefault()}>
          <Col md={3} className='mb-1'>
            <TextField
              disabled={loader}
              size='sm'
              name='nom'
              value={search.nom}
              onChange={e => handleChange(e, search, setSearch)}
              placeholder='Nom...'
            />
          </Col>
          
          <Col md={3} className='mb-1'>
            <TextField
              disabled={loader}
              type='date'
              size='sm'
              name='start'
              value={search.start}
              onChange={e => handleChange(e, search, setSearch)}
              placeholder='N° facture'
            />
          </Col>
          
          <Col md={3} className='mb-1'>
            <TextField
              disabled={loader}
              type='date'
              size='sm'
              name='end'
              value={search.end}
              onChange={e => handleChange(e, search, setSearch)}
              placeholder='N° facture'
            />
          </Col>
          
          <Col md={3} className='mb-1'>
            <Button type='submit' disabled={loader} variant='outline-primary' className='w-100' size='sm'>
              Rechercher
            </Button>
          </Col>
        </form>
      </div>
      
      <ActionsComp
        nbElements={4}
        options={getgetCategorieLitActionsOptions()}
        state={action}
        setState={setAction}
        loader={false}
        size='sm'
      />
      
      <RdvData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        rdvs={rdvs}
        setRdvs={setRdvs}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
