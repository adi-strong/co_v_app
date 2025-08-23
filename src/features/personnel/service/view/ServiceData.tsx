import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeDocSuivi} from "../../../traitements/typeDocSuivi/model/typeDocSuiviService.ts";
import type {Service} from "../model/serviceService.ts";
import ServiceItem from "./ServiceItem.tsx";

export default function ServiceData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  services: Service[]
  setServices: Dispatch<SetStateAction<Service[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    services,
    setServices,
  } = props
  
  return (
    <>
      <Table hover striped responsive>
        <thead>
        <tr>
          <th style={{ fontSize: '1rem' }}>
            <CheckField
              inline
              name='isSelectedAll'
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setServices)}
              value={isSelectedAll}
              checked={isSelectedAll}
              className='me-0'
            />
            Nom
          </th>
          <th style={{ fontSize: '1rem' }}>Date</th>
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {services.length > 0 && services.map((c: TypeDocSuivi, index: number) =>
          <ServiceItem
            key={index}
            service={c}
            setServices={setServices}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
