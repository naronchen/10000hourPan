import '../css/entryPage.css'
import { useNavigate } from 'react-router-dom';

export default function EntryPage() {
  let navigate = useNavigate();

  const gotoLogin = () => {
    navigate('/login');
  };

  return (
    <div className='title-container'>
      <div className="title">一万小时计划</div>

      <div className="start-button">
        <div onClick={gotoLogin} className="start-text">
          开始
        </div>
      </div>

    </div>
  )
}
