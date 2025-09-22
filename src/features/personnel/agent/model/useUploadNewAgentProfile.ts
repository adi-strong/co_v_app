import type {Dispatch, RefObject, SetStateAction} from "react";
import {useEffect, useRef} from "react";
import type {AgentImage} from "./agentService.ts";
import {useUpdateAgentProfileMutation} from "./agent.api.slice.ts";
import {onUpdateAgentProfileSubmit} from "./agentService.ts";

export default function useUploadNewAgentProfile(
  state: AgentImage,
  setState: Dispatch<SetStateAction<AgentImage>>,
  onRefresh: () => void
): void {
  
  const [onUpdateAgent] = useUpdateAgentProfileMutation();
  const hasSubmittedRef: RefObject<boolean> = useRef(false)
  
  useEffect(() => {
    const file = state.file?.[0]?.file
    
    if (file && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true
      
      const handleSubmit = async (): Promise<void> => {
        try {
          await onUpdateAgentProfileSubmit(
            state,
            setState,
            onUpdateAgent,
            onRefresh
          )
        } finally {
          hasSubmittedRef.current = false
        }
      };
      
      handleSubmit();
    }
  }, [state.file])
}
