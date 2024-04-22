import React from "react";
import SignatureCanvas from "react-signature-canvas";
import "../styles/signature-pad.css";

const SignaturePad = ({
  showSignaturePad = false,
  onSave = async () => {},
  onClose = () => {},
}) => {
  const signaturePadRef = React.useRef(null);

  const onClear = () => {
    signaturePadRef.current?.clear();
  };
  const onSaveHelper = async () => {
    if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) return;
    await onSave(signaturePadRef.current.getTrimmedCanvas().toDataURL("image/png"));
    onClose();
  };
  if (!showSignaturePad) return null;
  return (
    <div className="signature-pad-overlay">
      <div className="signature-pad-container">
        <div className="cross" onClick={onClose}></div>
        <SignatureCanvas
          ref={signaturePadRef}
          penColor="rgb(20, 28, 46)"
          canvasProps={{ height: 200, width: 400, className: "signature-pad" }}
        />
        <div className="buttons-wrapper">
          <button className="save-button" onClick={onSaveHelper}>
            Save
          </button>
          <button className="clear-button" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;
