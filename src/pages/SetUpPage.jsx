import {useState, useEffect} from 'react'
import '../css/setUpPage.css'
import {supabase} from '../client/supabaseClient'
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';


export default function SetUpPage() {
  const myUserId = '69a2d2f7-e4ac-4e61-a95a-a8339508ab26'

  let navigate = useNavigate();
  const gotoHomePage = () => {
    navigate('/homePage');
  };

  const [inputContainers, setInputContainers] = useState([])

  // fetch from supabase all the existing goals
  useEffect(() => {
    async function fetchGoals() {
      try {
        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('userId', myUserId)
          .select('goalDetails');
          
        if (error) {
          console.error("Error fetching data: ", error);
        } else {
          const formattedData = data[0]?.goalDetails?.map((goal, index) => {
            return {
              id: index,
              value: goal.goalDescription,
              goalType: goal.goalType,
              isSaved: true,
            }
          })
          
          if (formattedData.length === 0) {
            setInputContainers([{
              id: 0,
              value: '',
              goalType: 20,
              isSaved: false,
            }])
          } else {
            // console.log(formattedData)
            setInputContainers(formattedData);
          }
        }
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    }
    fetchGoals();
  }, []);

  const handleAddInputContainer = () => {
    setInputContainers([...inputContainers, {
      id: inputContainers.length + 1,
      value: '',
      goalType: 20,
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


  // update all rows of this userId, delete the ones that are not in the inputContainers
  const handleSubmit = async () => {
    const savedItems = inputContainers.filter(container => container.isSaved);

    try {
      // selete the json object called goalDetails
      const { data: existingGoals, error: fetchError } = await supabase
        .from('goals')
        .select('*')
        .eq('userId', myUserId)
        .select('goalDetails');

      if (fetchError) { throw fetchError }

      const goalsToKeep = existingGoals[0].goalDetails.filter(goal =>
        savedItems.some(item => item.value === goal.goalDescription));
      const goalsToInsert = savedItems.filter(item => 
        !existingGoals[0].goalDetails.some(goal => goal.goalDescription === item.value));
      const formattedGoalsToInsert = goalsToInsert.map(item => {
        return {
          goalDescription: item.value,
          goalType: item.goalType,
          timeSpent: 0,
        }
      })

      // put goalsToKeep and goals to Insert together
      const updatedGoals = goalsToKeep.concat(formattedGoalsToInsert);
      // console.log('goalsToKeep: ', goalsToKeep);
      const { data, error } = await supabase
      .from('goals')
      .update({ goalDetails: updatedGoals })
      .eq('userId', myUserId);

      gotoHomePage()
      // update the goalDetails
      // console.log("Inserted data: ", data);
      // Handle successful insertion, e.g., updating state, showing confirmation, etc.

    } catch (err) {
      console.error("An error occurred: ", err);
    }
  }

  return (
    <>
    <Sidebar />
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
    </>
  )
}
