import React, { useEffect } from "react";
import "../styles/certificate.css";
import { useCertificateInfo } from "../hooks/useCertificateInfo";
import certificateImgUrl from "../assets/Certificate_1.png";
import { loadUpdatedCanvas } from "../helpers/CanvasControllers";
import { certificateOneFields, certificateOneTextFieldStyles } from "../data";
import { CertificateFields } from "../constants";
import OffscreenCanvasWorker from "../worker/offscreen-worker?worker";

const Certificate = () => {
  const { globalCertificateInfo, canvasRef } = useCertificateInfo();
  const workerRef = React.useRef(null);

  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const worker = new OffscreenCanvasWorker();
    workerRef.current = worker;
    worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);
  }, []);

  useEffect(() => {
    const getTextWithStyles = () => {
      return Object.keys(globalCertificateInfo)
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
    };
    if (workerRef.current) {
      const textWithStyles = getTextWithStyles();
      const worker = workerRef.current;

      const updateCanvas = () => {
        worker.postMessage(
          {
            certificateImgUrl,
            textWithStyles,
            signature:
              globalCertificateInfo[CertificateFields.AuthoritySignature],
          }
        );
      };

      let timeout = setTimeout(updateCanvas, 500);

      window.addEventListener("resize", updateCanvas);
      return () => {
        window.removeEventListener("resize", updateCanvas);
        clearTimeout(timeout);
      };
    }
  }, [workerRef.current, globalCertificateInfo]);

  return (
    <div className="certificate-container-div">
      <div className="certificate-div">
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>
    </div>
  );
};

export default Certificate;
