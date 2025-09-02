import Content from "./features/app/Content.tsx";
import toast, {ToastBar, Toaster} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setup} from "./features/auth/model/auth.slice.ts";

function App() {
  
  const dispatch = useDispatch()
  
  useEffect((): void => { dispatch(setup()) }, [dispatch])

  return (
    <>
      <Content/>
      
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          duration: 2000,
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="btn border-0"
                  >
                    <i className="bi bi-x" />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  )
  
}

export default App
