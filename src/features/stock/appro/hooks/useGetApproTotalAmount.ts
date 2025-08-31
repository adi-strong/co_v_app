import {useCallback} from "react";

export default function useGetApproTotalAmount(subTotal: number, taxesAmount: number) {
  
  return useCallback(() => {
    let sum: number = 0
    sum += subTotal
    if (taxesAmount) sum += taxesAmount
    
    return sum
  }, [subTotal, taxesAmount])
  
}
