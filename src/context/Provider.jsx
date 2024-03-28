import React from "react";
import { useState, createContext } from "react";
import { CertificateFields } from "../constants";
export const GlobalInfo = createContext({});

export const ProviderInfo = ({ children }) => {
  const [globalCertificateInfo, setGlobalCertificateInfo] = useState({
    [CertificateFields.Name]: "",
    [CertificateFields.Purpose]: "",
    [CertificateFields.Authority]: "",
    [CertificateFields.AuthoritySignature]: "",
    [CertificateFields.PositionOfAuthority]: "",
  });

  const canvasRef = React.useRef(null);

  const updateCertificateInfo = (key, value) => {
    setGlobalCertificateInfo((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return (
    <GlobalInfo.Provider
      value={{ globalCertificateInfo, updateCertificateInfo,canvasRef }}
    >
      {children}
    </GlobalInfo.Provider>
  );
};
