import { useContext } from "react";
import { GlobalInfo } from "../context/Provider";

export const useCertificateInfo = () => {
  const certificateInfo = useContext(GlobalInfo);
  return certificateInfo;
};
