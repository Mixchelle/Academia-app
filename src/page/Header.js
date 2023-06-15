import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


function Header({ userName }) {
  return (
    <header>
      <p>Bem-vinda, {userName}!</p>
      <div className="icon">
      <FontAwesomeIcon className="icons" icon={faDumbbell} /> 
      <h3>Bom treino</h3>
      <FontAwesomeIcon className="icons" icon={faDumbbell} /> 
      </div>
    </header>
  );
}

export default Header;
