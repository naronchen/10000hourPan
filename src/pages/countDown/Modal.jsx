import { useNavigate } from "react-router-dom";

export default function Modal({ onClose }) {
    let navigate = useNavigate();
    const gotoHomePage = () => {
      navigate('/homePage');
    }
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-text">你成功专注了 25 分钟 </div>
          <div className="modal-text-2">时间已被记录</div>
        </div>
        <div className="buttons">
            <button className="modal-button" onClick={gotoHomePage}>返回</button>
            <button className="modal-button" onClick={gotoHomePage}>继续专注</button>
        </div>
      </div>
    );
  }
  