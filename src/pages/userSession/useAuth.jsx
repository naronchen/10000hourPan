import {useState, useEffect} from 'react';
import { supabase } from '../../client/supabaseClient';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        supabase.auth.getSession()
          .then(({ data: { session } }) => {
            setLoading(true);
            // console.log('session: ', session);
            // console.log(session ? true : false);
            setIsAuthenticated(session ? true : false); // Set isAuthenticated to true if session exists
            const user = session?.user;
            setUserId(user?.id);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching session:', error);
            setIsAuthenticated(false); // Ensure isAuthenticated is false in case of an error
            setUserId(null);
            setLoading(false);
          });
          
      }, []);

      return { isAuthenticated, userId, loading };
    }

export default useAuth;
