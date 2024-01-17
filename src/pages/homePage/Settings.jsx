import React from 'react'
import exitIcon from '../../assets/exit-icon.png'
import { useEffect } from 'react'
import { supabase } from '../../client/supabaseClient';

export default function Settings({ onClose, goalDescript, focusTime, nextTarget }) {


  return (
    <div className="modal-overlay">
      <div className='modal-container'>
        <img className='exit-icon' src={exitIcon} alt="exit icon" onClick={onClose}/>
        <div className="modal-title">
            {goalDescript}
        </div>

        <div className='settings-row'>
          <div>
            单次专注时间
          </div>
          <div>
            <input type="text" className="Focus-input" placeholder={focusTime/60} /> 分钟
          </div>
        </div>

        <div className='settings-row'>
          <div>
            下个阶段目标时间
          </div>
          <div>
            <input type="text" className="Focus-input" placeholder={nextTarget || ''} /> 小时
          </div>
        </div>

        <div className="buttons">
            {/* 没有返回，做个x和周围背景推出按钮 */}
            {/* <button className="modal-button" onClick={onClose}>返回</button> */}
            <button className="modal-button" onClick={onClose}>保存</button>
        </div>
      </div>
    </div>
  )
}
