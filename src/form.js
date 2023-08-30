import React, { useContext, useEffect, useState } from "react";
import "./styles/form.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { GlobalInfo } from "./context/provider";
import { refContainer } from "./Certificate";

const Form = () => {
  const certificateInfo = {
    name: "",
    ins: "",
    ach: "",
    date: "",
    sign: "",
  };

  const setGlobalCertificateInfo = useContext(GlobalInfo)[1];

  const [certificateInfoUploaded, setCertificateInfoUploaded] =
    useState(certificateInfo);

  useEffect(() => {
    setGlobalCertificateInfo(certificateInfoUploaded);
  }, [certificateInfoUploaded, setGlobalCertificateInfo]);

  const inputHandler = (e) => {
    let changingProp = e.target.name;
    let changingValue = e.target.value;
    setCertificateInfoUploaded({
      ...certificateInfoUploaded,
      [changingProp]: changingValue,
    });
  };

  const saveAndDownloadHandler = (e) => {
    e.preventDefault();
    // console.log(refContainer.current);

    html2canvas(refContainer.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      console.dir(canvas);
      const pdf = new jsPDF("landscape", "px");

      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="form-div">
      <form className="form" onSubmit={saveAndDownloadHandler}>
        <header>
          <h1 className="normal-header">Details</h1>
        </header>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          onChange={inputHandler}
          value={certificateInfoUploaded.name}
          name="name"
          id="name"
          placeholder="Enter name: "
        />
        <label htmlFor="ins">Institution: </label>
        <input
          type="text"
          onChange={inputHandler}
          value={certificateInfoUploaded.ins}
          name="ins"
          id="ins"
          placeholder="Enter Institution name: "
        />
        <label htmlFor="ach">Achievement: </label>
        <input
          type="text"
          onChange={inputHandler}
          value={certificateInfoUploaded.ach}
          name="ach"
          id="ach"
          placeholder="Enter the certificate purpose: "
        />
        <label htmlFor="date">Date :</label>
        <input
          type="date"
          onChange={inputHandler}
          value={certificateInfoUploaded.date}
          name="date"
          id="date"
        />
        <label htmlFor="sign">Signature: </label>
        <h6>(Enter the signature of person who is issuing the certificate)</h6>
        <input
          type="text"
          onChange={inputHandler}
          value={certificateInfoUploaded.sign}
          name="sign"
          id="sign"
          placeholder="Enter authority signature:"
        />
        <button type="submit">Save & Download</button>
      </form>
    </div>
  );
};
export default Form;
