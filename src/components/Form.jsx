import React, { Fragment } from "react";
import "../styles/form.css";
import jsPDF from "jspdf";
import { useCertificateInfo } from "../hooks/useCertificateInfo";
import { certificateOneFields } from "../data";

const Form = () => {
  const { globalCertificateInfo, updateCertificateInfo, canvasRef } =
    useCertificateInfo();

  const inputHandler = (e) => {
    let changingProp = e.target.name;
    let changingValue = e.target.value;
    updateCertificateInfo(changingProp, changingValue);
  };

  const saveAndDownloadHandler = (e) => {
    e.preventDefault();
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px");

    let width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    pdf.save("certificate.pdf");
  };

  return (
    <div className="form-div">
      <form className="form" onSubmit={saveAndDownloadHandler}>
        <header>
          <h1 className="normal-header">Details</h1>
        </header>
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
        <button type="submit">Save & Download</button>
      </form>
    </div>
  );
};
export default Form;
