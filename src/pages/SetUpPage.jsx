import {useState} from 'react'
import '../css/setUpPage.css'
import {supabase} from '../client/supabaseClient'

export default function SetUpPage() {
  const myUserId = '69a2d2f7-e4ac-4e61-a95a-a8339508ab26'

  const [inputContainers, setInputContainers] = useState([{
    id: 1,
    value: ''
  }])

  const handleAddInputContainer = () => {
    setInputContainers([...inputContainers, {
      id: inputContainers.length + 1,
      value: '',
      goalType: '20h',
      isSaved: false,
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

  const addGoal = async (userId, description, type) => {
    const {data, error} = await supabase
      .from('goals')
      .insert([
        { userId: userId, goalDescription: description, goalType: type}
      ]);

      if (error){
        console.error("Error inserting data: ", error);
        return null;
      }

      return data
  }

  const handleSubmit = async () => {
    const savedItems = inputContainers.filter(container => container.isSaved);
    const formattedItems = savedItems.map(({value, goalType, ...rest}) => {
      return {
        userId: myUserId,
        goalDescription: value,
        goalType: goalType,
      }
    })

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert(formattedItems);
  
      if (error) {
        console.error("Error inserting data: ", error);
      } else {
        // console.log("Inserted data: ", data);
        // Handle successful insertion, e.g., updating state, showing confirmation, etc.
      }
    } catch (err) {
      console.error("An error occurred: ", err);
    }
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
      <img src='./src/assets/forward.png' onClick={handleSubmit} className='forward-icon'></img> 
    </div>
  )
}
