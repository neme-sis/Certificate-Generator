import React, { useEffect } from "react";
import "../styles/certificate.css";
import { useCertificateInfo } from "../hooks/useCertificateInfo";
import certificateImgUrl from "../assets/Certificate_1.png";
import { loadUpdatedCanvas } from "../helpers/CanvasControllers";
import { certificateOneFields, certificateOneTextFieldStyles } from "../data";
import { CertificateFields } from "../constants";

const Certificate = () => {
  const { globalCertificateInfo, canvasRef } = useCertificateInfo();

  useEffect(() => {
    if (canvasRef.current) {
      const textWithStyles = Object.keys(globalCertificateInfo)
        .filter(
          (key) =>
            certificateOneFields.find((field) => field.name === key)
              ?.isTextField
        )
        .map((key) => {
          return {
            text:
              globalCertificateInfo[key] ||
              certificateOneFields.find((field) => field.name === key)
                ?.defaultValue ||
              "",
            style: certificateOneTextFieldStyles[key],
          };
        });
      const updateCanvas = () =>
        loadUpdatedCanvas(
          canvasRef.current,
          certificateImgUrl,
          textWithStyles,
          globalCertificateInfo[CertificateFields.AuthoritySignature]
        );

      let timeout = setTimeout(updateCanvas, 500);

      const resizeHandlers = () => {
        updateCanvas();
      };

      window.addEventListener("resize", resizeHandlers);
      return () => {
        window.removeEventListener("resize", resizeHandlers);
        clearTimeout(timeout);
      };
    }
  }, [canvasRef.current, globalCertificateInfo]);

  return (
    <div className="certificate-container-div">
      <div className="certificate-div">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Certificate;
