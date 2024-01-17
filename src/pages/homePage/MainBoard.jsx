import { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import { useNavigate } from 'react-router-dom';

import settingsIcon from '../../assets/settings.png';
import Settings from './Settings';
import Goal from './Goal';

export default function MainBoard() {

    const [goals, setGoals] = useState([])
    const [loadAnimation, setLoadAnimation] = useState(false);

    const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from('goals')
            .select('*');
      
          if (error) throw error;
      
          if (data){
            setGoals(data)
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

                  return (
                      <Goal key={index} goal={goal}/>
                  )
              })
            }
        </div>
    </div>
  )
}
