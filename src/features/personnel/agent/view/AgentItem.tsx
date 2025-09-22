import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  sexLabel
} from "../../../../services/services.ts";
import {CheckField, RemoveModal} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Agent} from "../model/agentService.ts";
import RemoveAgentModal from "./RemoveAgentModal.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function AgentItem(props: {
  agent: Agent
  setAgents: Dispatch<SetStateAction<Agent[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    agent,
    index,
    // setAgents,
    onRefresh,
  } = props
  
  const [isDel, setIsDel] = useState<boolean>(false)
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          {/* <CheckField
            inline
            name='selected'
            value={agent.selected}
            checked={agent.selected}
            onChange={(): void => setSelectedDataItem(index, setAgents)}
            className='me-0'
          /> */}
          <Link to={`/app/agents/${agent.id}/${agent?.slug}`} className='text-uppercase'>
            {agent?.fullName ?? agent.nom}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Link to={`/app/agents/${agent.id}/${agent?.slug}/edit`} className='p-0 btn btn-sm btn-link'>
              Modifier
            </Link>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>{sexLabel[agent.sexe]}</td>
        <td>{agent?.fkFonction?.nom ?? '—'}</td>
        <td>{agent.tel}</td>
        <td>{agent?.createdAt
          ? `enregistré le ${moment(agent.createdAt).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
      </tr>
      
      <RemoveAgentModal
        onHide={(): void => handleShow(setIsDel)}
        data={agent}
        show={isDel}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
