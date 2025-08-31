import {useCallback} from "react";
import type {ApproProductItem} from "../model/approService.ts";

export default function useGetApproSubTotal(products: ApproProductItem[], discount: number) {
  
  return useCallback(() => {
    let subTotal: number = 0
    
    if (products.length > 0) products.forEach((product: ApproProductItem): void => {
      const price: number = product?.price ?? product.prixHt
      const quantity: number = product?.qty ?? product.quantite
      subTotal += (price * quantity)
    })
    
    if (discount > 0 && subTotal > 0) {
      const discountSum: number = (subTotal * discount) / 100
      subTotal -= discountSum
    }
    
    return subTotal
  }, [products, discount])
  
}
