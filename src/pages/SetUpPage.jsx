import React, {useState} from 'react'
import '../css/setUpPage.css'

export default function SetUpPage() {
  const [inputValue, setInputValue] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  
  const [inputContainers, setInputContainers] = useState([{
    id: 1,
    value: ''
  }])

  const handleAddInputContainer = () => {
    setInputContainers([...inputContainers, {
      id: inputContainers.length + 1,
      value: '',
      isSaved: false
    }])
  }
  const handleMinusInputContainer = () => {
    if (inputContainers.length > 0) {
      setInputContainers(inputContainers.slice(0, -1));
    }
  }

  const handleInputChange = (id, val) => {
    const updatedContainers = inputContainers.map(container => {
      if (container.id === id){
        return {...container, value: val}
      }
      return container;
    });
    setInputContainers(updatedContainers);
  }

  const handleAddInput = (id) => {
    const updatedContainers = inputContainers.map(container => {
      if (container.id === id){
        if (container.isSaved){
          return {...container, isSaved: false}
        } else {
          return {...container, isSaved: true}
        }
      }
      return container;
      });
    setInputContainers(updatedContainers);
  }

  return (
    <div className='setUp-container'>
      <div className='input-container'>
        <div className='text-title'>
          输入目标
        </div>

        <div className='add-button-container'>
          <button onClick={handleAddInputContainer} className='add-button'>+</button>
          <button onClick={handleMinusInputContainer} className='add-button'>-</button>
        </div>

        {
          inputContainers.map( container => (
            <div key={container.id} className='singleInput-container'>
              <input 
                type='text' 
                className='border-input' 
                placeholder='你想要做什么？'
                value={container.value}
                onChange={(e)=>handleInputChange(container.id, e.target.value)}
              />
              <div className='button-container'>
                <button className={`input-button ${container.isSaved ? 'green-button' : ''}`} onClick={() => handleAddInput(container.id)}></button>
              </div>  
            </div>
          )
          )
        }
      </div>
      <div className='input-board'>
        {
          inputContainers.map( container => (
            container.isSaved && (
              <div key={container.id} className='present'>
                - {container.value}
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}
