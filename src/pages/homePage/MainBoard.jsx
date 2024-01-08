import {useEffect, useState} from 'react';
import {supabase} from '../../client/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function MainBoard() {

    let navigate = useNavigate();

    const gotoFocusPage = (goalDescription) => {
      navigate(`/focus/${goalDescription}`);
    }

    const [goals, setGoals] = useState([])
    const [loadAnimation, setLoadAnimation] = useState(false);

    const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from('goals')
            .select('*');
      
          if (error) throw error;
      
          if (data[0]){
            setGoals(data[0].goalDetails)
            // console.log(data[0].goalDetails)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoadAnimation(true);
        }
      };

    useEffect(() => {
      fetchData();
    }, [])

  return (
    <div className='mainBoard-container' >
        <div className='goals'>
            {
              goals.map((goal, index) => {
                  const progressPercentage = ((goal.timeSpent / (goal.goalType * 60)) * 100).toFixed(2);
                  const barWidth = loadAnimation ? `${progressPercentage}%` : '0%';
                  return (
                      <div className='goal' key={index}>
                          <div className='goal-descript'>{goal.goalDescription}</div>
                          <div className='progress-container'>
                              <div  className='progress-bar' 
                                    style={{ width: barWidth }}
                              />
                          </div>
                          <div className='progress-percent'>
                            {progressPercentage}%
                          </div>

                          <div className='enter-button' onClick={() => {gotoFocusPage(goal.goalDescription)}}>
                            进入状态
                          </div>
                      </div>
                  )
              })
            }
        </div>
    </div>
  )
}
