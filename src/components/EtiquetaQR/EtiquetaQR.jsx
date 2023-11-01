import './EtiquetaQR.css'


// eslint-disable-next-line react/prop-types
export default function EtiquetaQR({id, qr_code}) {
  return (
    <>
        <div className="etiqueta-qr" style={{width: '13rem'}}>
          <h4 className="codigo-reactivo">{id}</h4>

          <div className="img-container">
          <img src={qr_code} style={{ width: "5rem" }} className="QRCode" />

          </div>
          <div className="vencimiento">
           
              <p>VTO</p>
                
              <div className="checks">
              <div className="check-container">
                   <div className="check">  </div>
                   <p>90</p>
              </div>
              <div className="check-container">
                   <div className="check">  </div>
                   <p>60</p>
              </div>
              <div className="check-container">
                   <div className="check">  </div>
                   <p>30</p>
              </div>
            </div>
          </div>
        </div>
    
    </>
  )
}
