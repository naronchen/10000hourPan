import {useState, useEffect} from 'react'
import '../css/setUpPage.css'
import {supabase} from '../client/supabaseClient'
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import useAuth from './userSession/useAuth';


export default function SetUpPage() {
  const { userId, loading: fetchingUserId } = useAuth();

  let navigate = useNavigate();
  const gotoHomePage = () => {
    navigate('/homePage');
  };

  const [inputContainers, setInputContainers] = useState([])

  // fetch from supabase all the existing goals
  useEffect(() => {
    async function fetchGoals() {
      try {
        const { data } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', userId)
          .select('goalDetails');

        // Check if data is received and has the expected structure
        if (data && data.length > 0 && Array.isArray(data[0].goalDetails)) {
          const formattedData = data[0].goalDetails.map((goal, index) => ({
            id: index,
            goalDescription: goal.goalDescription,
            goalType: goal.goalType,
            isSaved: true,
          }));

          // Check if formattedData is not empty
          if (formattedData.length > 0) {
            setInputContainers(formattedData);
          } else {
            setInputContainers([{ id: 0, goalDescription: '', goalType: 20, isSaved: false }]);
          }
        } else {
          // Handle the case when no data is found
          setInputContainers([{ id: 0, goalDescription: '', goalType: 20, isSaved: false }]);
        }
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    }
    if (!fetchingUserId && userId){
      fetchGoals()
    }
  }, [userId, fetchingUserId]);

  const handleAddInputContainer = () => {
    setInputContainers([...inputContainers, {
      id: inputContainers.length + 1,
      goalDescription: '',
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
        return {...container, goalDescription: val}
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
    const formattedItems = savedItems.map(item => ({
      goalDescription: item.goalDescription,
      goalType: item.goalType,
      timeSpent: 0,
    }));

    try {

      console.log(formattedItems)
      const { data, error } = await supabase
          .from('goals')
          .upsert({ user_id: userId, goalDetails: formattedItems }, { onConflict: 'user_id' });
      
      if (error) throw error;

      gotoHomePage()

    } catch (err) {
      console.error("An error occurred: ", err);
    }
  }

  return (
    <div className='home-container'>
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
                  value={container.goalDescription}
                  onChange={(e)=>handleInputChange(container.id, e.target.value)}
                />
                <div className='button-container'>
                  <button className={`input-button ${container.isSaved ? 'green-button' : ''}`} onClick={() => handleAddInput(container.id)}></button>
                </div>  
              </div>
            ))
          }
          <div>
            <button className='save-button' onClick={handleSubmit}>保存</button>
          </div>
        </div>
        
        <div className='input-board'>
          {
            inputContainers.map( container => (
              container.isSaved && (
                <div key={container.id} className='present'>
                  - {container.goalDescription}
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}
