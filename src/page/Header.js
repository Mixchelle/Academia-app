import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


function Header({ userName }) {
  return (
    <header>
      <p>Bem-vinda, {userName}!</p>
      <FontAwesomeIcon className="icons" icon={faDumbbell} /> 
    </header>
  );
}

export default Header;
