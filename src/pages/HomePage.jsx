import React, { useEffect } from 'react'
import {supabase} from '../client/supabaseClient'

export default function HomePage() {

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*');
  
      if (error) throw error;
  
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>HomePage</div>
    
  )
}
