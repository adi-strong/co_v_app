import {useCallback} from "react";

export default function useGetApproTotalAmount(
  subTotal: number,
  taxesAmount: number,
  discount: number
) {
  
  return useCallback(() => {
    let sum: number = 0
    sum += subTotal
    if (taxesAmount) sum += taxesAmount
    if (discount > 0) {
      const addDiscount: number = (sum * discount) / 100
      sum -= addDiscount
    }
    
    return sum
  }, [subTotal, taxesAmount, discount])
  
}
