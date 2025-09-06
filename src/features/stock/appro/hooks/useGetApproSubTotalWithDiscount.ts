import {useCallback} from "react";

export default function useGetApproSubTotalWithDiscount(subTotal: number, discount: number) {
  
  return useCallback(() => {
    if (discount > 0.00) {
      const discountAmount: number = (subTotal * discount) / 100
      subTotal -= discountAmount
    }
    
    return subTotal
  }, [subTotal, discount])
  
}
