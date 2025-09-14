import {useSelector} from "react-redux";
import type {InfoGenState} from "../features/configs/infosGen/model/infosGen.slice.ts";
import type {Agent} from "../features/personnel/agent/model/agentService.ts";

const HospFooter = ({ agent }: { agent?: Agent }) => {
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)

  return (
    <>
      <div className='mt-5 bg-dark text-dark border-black border-bottom-0 border-1 p-1'/>
      
      <div className='white-space text-center mt-3'>
        {infos?.address}
        
        {agent && (
          <p>
            {agent.tel}
            {agent?.email && (
              <span> | <i className='text-decoration-underline'>{agent.email}</i></span>
            )}
          </p>
        )}
      </div>
    </>
  )
  
};

export default HospFooter;
