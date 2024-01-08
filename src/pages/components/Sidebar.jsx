
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
      '--pseudo-display': isOpen ? 'block' : 'none'
    };

    const toggleButtonStyle = {
        right: isOpen? '5px' : 'auto',
        left: isOpen? 'auto' : '0px',
    }
    
    const itemsStyle = {
        display: isOpen ? 'flex' : 'none',
        borderRight: isOpen ? '5px solid white' : 'none'
    };

    let navigate = useNavigate();
    const gotoSetUpPage = (e) => {
      e.stopPropagation();
      navigate('/setUpPage');
    };
    const gotoHomePage = () => {
      navigate('/homePage');
    }

    
    return (
      <div className="sidebar" style={sidebarStyle}>
        <button onClick={toggle} className='toggle-button' style={toggleButtonStyle}> 
        {isOpen ? '<' : '>'}
        </button>
        <div className='sidebar-items' style={itemsStyle} >
            <div className='sidebar-item' onClick={gotoHomePage}>
                面板
            </div>
            <div className='sidebar-item' onClick={gotoSetUpPage}>
                目标设定
            </div>
        </div>
      </div>
    );
  }
  