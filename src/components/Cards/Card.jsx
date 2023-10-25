
import {Col, Panel } from 'rsuite';
import { Link } from 'react-router-dom';

import './Card.css'


// eslint-disable-next-line react/prop-types
function Card({img_path, title, link, xl}) {
  return (
    <Link to={link}>
      <Col xs={24} sm={12} md={12} xl={xl} className="col">
          <Panel  className="home-card">
            <img src={img_path} alt="imagen crear pieza" className="img"/>
          </Panel>
          <h4 className="card-title">{title}</h4>
    </Col>
    
    </Link>
  )
}

export default Card