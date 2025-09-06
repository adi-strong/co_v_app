import {useCallback} from "react";
import type {ApproProductItem} from "../model/approService.ts";

export default function useGetApproSubTotal(products: ApproProductItem[]) {
  
  return useCallback(() => {
    let subTotal: number = 0
    
    if (products.length > 0) products.forEach((product: ApproProductItem): void => {
      const price: number = product?.price ?? product.prixHt
      const quantity: number = product?.qty ?? product.quantite
      subTotal += (price * quantity)
    })
    
    return subTotal
  }, [products])
  
}
