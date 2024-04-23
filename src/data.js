import { CertificateFields } from "./constants";

export const certificateOneFields = [
  {
    label: CertificateFields.Name,
    name: CertificateFields.Name,
    id: CertificateFields.Name.toLowerCase(),
    placeholder: "Enter name: ",
    isTextField: true,
    defaultValue: "<John Doe>",
  },
  {
    label: CertificateFields.Purpose,
    name: CertificateFields.Purpose,
    id: CertificateFields.Purpose.toLowerCase(),
    placeholder: "Enter the certificate purpose: ",
    isTextField: true,
    defaultValue: "<Certificate of Participation>",
  },
  {
    label: CertificateFields.Authority,
    name: CertificateFields.Authority,
    id: CertificateFields.Authority.toLowerCase(),
    placeholder: "Enter authority name: ",
    isTextField: true,
    defaultValue: "<Authority Name>",
  },
  {
    label: "Position of Authority",
    name: CertificateFields.PositionOfAuthority,
    id: CertificateFields.PositionOfAuthority.toLowerCase(),
    placeholder: "Enter authority position: ",
    isTextField: true,
    defaultValue: "<CEO of Company>",
  },
  // {
  //   label: "Authority Signature",
  //   name: CertificateFields.AuthoritySignature,
  //   id: CertificateFields.AuthoritySignature.toLowerCase(),
  //   placeholder: "Enter authority signature: ",
  // },
];

export const certificateOneTextFieldStyles = {
  [CertificateFields.Name]: {
    color: "#E9B72E",
    fontSize: "100px",
    fontFamily: "cursive",
    fontWeight: "700",
    width: 1000,
    height: 737,
  },
  [CertificateFields.Purpose]: {
    color: "#3b3a3a",
    fontSize: "35px",
    fontFamily: "monospace",
    fontWeight: "400",
    width: 1000,
    height: 857,
  },
  [CertificateFields.Authority]: {
    color: "#3b3a3a",
    fontSize: "40px",
    fontFamily: "monospace",
    fontWeight: "600",
    width: 1000,
    height: 1164,
  },
  [CertificateFields.PositionOfAuthority]: {
    color: "#3b3a3a",
    fontSize: "35px",
    fontFamily: "monospace",
    fontWeight: "400",
    width: 1000,
    height: 1214,
  },
};
