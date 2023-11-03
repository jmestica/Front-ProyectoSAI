import img from '../../assets/browser.png'
import './404.css'

function Error404() {
  return (
    <div className="error">
      <img className="img-error" src={img}/>
      <h3 className='title'>La página que estás intentando de acceder no existe, en caso de haber escaneado el QR, verifica que el reactivo no haya sido eliminado.</h3>
   
      
    </div>
  )
}

export default Error404