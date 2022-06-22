import React from 'react'
import { useState, createContext } from 'react'
export const GlobalInfo = createContext({})

export const ProviderInfo = ({children}) => {


    const [GlobalCertificateInfo, setGlobalCertificateInfo] = useState({})

  return (
    <GlobalInfo.Provider value={[GlobalCertificateInfo, setGlobalCertificateInfo]}>{children}</GlobalInfo.Provider>
  )
}