import type {InfosGen} from "../model/infosGenService.ts";
import InfoForm from "./InfoForm.tsx";

export default function InfosGenList({ infos }: { infos: InfosGen }) {
  
  return (
    <>
      <div className='mb-6'>
        <h4 className='mb-1 pe-4 px-4 pt-5'>Paramètres</h4>
      </div>
      
      <InfoForm data={infos} />
    </>
  )
  
}
