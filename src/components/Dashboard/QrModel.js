import React from 'react'

const QrModel = ({ showQrCode, qrImageUrl, setShowQrCode }) => {

  if(!showQrCode) {
    return null;
  }

  return (
    <div className="qr-overlay">

      <div className="qr-model">

          <h2>Scan the Qr Code</h2>

          <img src={qrImageUrl} alt="Qr Code" className='qr-image'/>

          <div className="qr-actions">

            <a href={qrImageUrl} download="qr_code.png" className='download-btn'>
                <button>Download</button>
            </a>    

            <button onClick={() => setShowQrCode(false)}>
              Close
            </button>

          </div>  

      </div>

    </div>
  )
}

export default QrModel
