import React, { Fragment } from "react";
import "../styles/form.css";
import jsPDF from "jspdf";
import { useCertificateInfo } from "../hooks/useCertificateInfo";
import { certificateOneFields } from "../data";
import SignaturePad from "./SignaturePad";
import { CertificateFields } from "../constants";

const Form = () => {
  const { globalCertificateInfo, updateCertificateInfo, canvasRef } =
    useCertificateInfo();
  const [showSignaturePad, setShowSignaturePad] = React.useState(false);

  const inputHandler = (e) => {
    let changingProp = e.target.name;
    let changingValue = e.target.value;
    updateCertificateInfo(changingProp, changingValue);
  };

  const updateSignatureInCertificate = (signature) => {
    updateCertificateInfo(CertificateFields.AuthoritySignature, signature);
  };

  const saveAndDownloadHandler = (e) => {
    e.preventDefault();
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL("image/png", 0.5);
    const pdf = new jsPDF("landscape", "px", undefined, true);
    let width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    pdf.save("certificate.pdf");
  };

  return (
    <>
      <SignaturePad
        showSignaturePad={showSignaturePad}
        onClose={() => setShowSignaturePad(false)}
        onSave={(signature) => updateSignatureInCertificate(signature)}
      />
      <div className="form-div">
        <div className="form">
          <h1 className="normal-header">Details</h1>
          {certificateOneFields.map((field) => {
            return (
              <Fragment key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={globalCertificateInfo[field.name]}
                  name={field.name}
                  id={field.id}
                  placeholder={field.placeholder}
                />
              </Fragment>
            );
          })}
          <label htmlFor={CertificateFields.AuthoritySignature.toLowerCase()}>
            Authority Signature
          </label>
          <button
            id={CertificateFields.AuthoritySignature.toLowerCase()}
            className="open-signature-modal-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowSignaturePad(true);
            }}
          >
            Enter Signature
          </button>
          <button
            type="submit"
            className="download-certificate-btn"
            onClick={saveAndDownloadHandler}
          >
            Save & Download
          </button>
        </div>
      </div>
    </>
  );
};
export default Form;
