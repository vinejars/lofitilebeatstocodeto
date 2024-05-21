import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


type ErrorModalContextType = {
    setShowErrorModal: Dispatch<SetStateAction<boolean>>;
    showErrorModal: boolean;
}
const errorModalContextInitialValue = {
    setShowErrorModal: () => {},
    showErrorModal: false,
}

const ErrorModalContext = createContext<ErrorModalContextType>(errorModalContextInitialValue)


export const ErrorModalContextProvider =  ({ children }: { children: React.ReactNode }) => {
    const [showErrorModal, setShowErrorModal] = useState(false)
    

   return(
    <ErrorModalContext.Provider value={{setShowErrorModal, showErrorModal}}>
        { children }
    </ErrorModalContext.Provider>
   ) 
}

// I recognize this is pretty dumb but I think it's more dumb to set up a whole CSEB for a calculator screen
// I more was using the ErrorModals as a way to help myself debug 

export const useErrorModalContext = () => {
    const { setShowErrorModal, showErrorModal } = useContext(ErrorModalContext)
    return { setShowErrorModal, showErrorModal }
  }