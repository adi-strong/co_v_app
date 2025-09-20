import type {Dispatch, RefObject, SetStateAction} from "react";
import {useEffect, useRef} from "react";
import type {ProduitImage} from "../model/produitService.ts";
import {useUpdateProduitImageMutation} from "../model/produit.api.slice.ts";
import {onUpdateProduitImageSubmit} from "../model/produitService.ts";

export default function useUploadNewProduitProfile(
  state: ProduitImage,
  setState: Dispatch<SetStateAction<ProduitImage>>,
  onRefresh: () => void
): void {
  
  const [onUpdateProduitImage] = useUpdateProduitImageMutation();
  const hasSubmittedRef: RefObject<boolean> = useRef(false)
  
  useEffect(() => {
    const file = state.file?.[0]?.file;
    
    if (file && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true
      
      const handleSubmit = async (): Promise<void> => {
        try {
          await onUpdateProduitImageSubmit(
            state,
            setState,
            onUpdateProduitImage,
            onRefresh
          )
        } finally {
          hasSubmittedRef.current = false // Reset si tu veux permettre une nouvelle soumission plus tard
        }
      };
      
      handleSubmit();
    }
  }, [state.file]); // ← Se déclenche uniquement quand `file` change
}
