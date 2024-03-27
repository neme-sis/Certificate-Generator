import React, { useContext } from 'react'
import "./styles/certificate.css"
import Header from './assets/Header'
import { GlobalInfo } from './context/Provider'

export const refContainer = React.createRef()




const Certificate = () => {

  const GlobalCertificateInfo = useContext(GlobalInfo)[0]

  const { name, ach, ins, date, sign } = GlobalCertificateInfo
  // console.log(GlobalCertificateInfo);

  return (
    <div className='certificate-div'>
      <h1 className='normal-header'>Preview</h1>
      <div className="certificate" ref={refContainer}>
        <Header />
        <h2 className='content'>
          This is to certify that <span className='vari'>{name || "Name"}&nbsp;</span>
          has completed the Achievement : <span className='vari'>{ach || "Achievement"}&nbsp;</span>
          by the help of workers/faculties of <span className='vari'>{ins || "Institution"}&nbsp;</span>
          and have completed a milestone to his/her successful career and
          wished to have a glorious future ahead.
        </h2>
        <section id="date"><span className="date">{date || "Date"}</span> Date</section>
        <section id="signature">
          <span className="sign">{sign || 'Sign'}</span>Signature</section>
      </div>
    </div>
  )
}

export default Certificate