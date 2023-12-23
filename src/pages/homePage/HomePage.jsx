import { useEffect, useState } from 'react'
import {supabase} from '../../client/supabaseClient'
import Sidebar from './Sidebar';
import '../../css/homePage.css'

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowBorder(!showBorder);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showBorder, setShowBorder] = useState(true);


  return (
    <div>
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={toggleSidebar} 
        showBorder={showBorder} 
      />
      
    </div>
    
  )
}
