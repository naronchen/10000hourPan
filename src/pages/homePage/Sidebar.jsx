
import '../../css/homePage.css'

export default function Sidebar({ isOpen, toggle, showBorder }) {
    const sidebarStyle = {
      width: isOpen ? '300px' : '30px',
      '--pseudo-display': isOpen ? 'block' : 'none',
    };

    const toggleButtonStyle = {
        right: isOpen? '0' : 'auto',
        left: isOpen? 'auto' : '0px',
    }
    const itemsStyle = {
        display: isOpen ? 'flex' : 'none',
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
        </div>
      </div>
    );
  }
  