import React from 'react'

export default function Settings({ onClose, goalDescript }) {
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            Hello {goalDescript}
        </div>
        <div className="buttons">
            <button className="modal-button" onClick={onClose}>返回</button>
            <button className="modal-button" onClick={onClose}>保存</button>
        </div>
    </div>
  )
}
