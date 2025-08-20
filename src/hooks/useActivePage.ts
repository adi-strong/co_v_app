import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {onToggleMenu} from "../reducers/menu.ts";

const useActivePage = (menuKey: string): void => {
  const dispatch = useDispatch()
  
  useEffect((): void => {
    dispatch(onToggleMenu({ menuKey }))
  }, [dispatch, menuKey])
}

export default useActivePage
