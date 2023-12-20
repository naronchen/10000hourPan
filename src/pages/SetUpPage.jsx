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
      value: ''
    }])
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

  const handleAddInput = () => {

  }

  return (
    <div className='setUp-container'>
      <div className='input-container'>
        <div className='text-title'>
          输入目标
        </div>

        <div className='add-button-container'>
          <button onClick={handleAddInputContainer} className='add-button'>+</button>
          {/* <button onClick={handleMinus}>-</button> */}
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
                <button className='input-button' onClick={handleAddInput()}></button>
              </div>  
            </div>
          )
          )
        }
      </div>
      <div className='input-board'>

      </div>
    </div>
  )
}
