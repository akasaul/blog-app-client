import React from 'react'
import './spinner.css';

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Spinner