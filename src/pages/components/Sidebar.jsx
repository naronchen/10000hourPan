
import '../../css/homePage.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
      setIsOpen(!isOpen);
    }

    const sidebarStyle = {
      width: isOpen ? '300px' : '30px',
      '--pseudo-display': isOpen ? 'block' : 'none',
      borderRight: isOpen ? '2px solid white' : 'none'
    };

    const toggleButtonStyle = {
        right: isOpen? '0' : 'auto',
        left: isOpen? 'auto' : '0px',
    }
    const itemsStyle = {
        display: isOpen ? 'flex' : 'none',
    };

    let navigate = useNavigate();
    const gotoSetUpPage = () => {
      navigate('/setUpPage');
    };

    
    return (
      <div className="sidebar" style={sidebarStyle}>
        <button onClick={toggle} className='toggle-button' style={toggleButtonStyle}> 
        {isOpen ? '<' : '>'}
        </button>
        <div className='sidebar-items' style={itemsStyle}>
            <div className='sidebar-item'>
                面板
            </div>
            <div className='sidebar-item' onClick={gotoSetUpPage}>
                目标设定
            </div>
        </div>
      </div>
    );
  }
  