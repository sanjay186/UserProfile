
import React,{useEffect,useState} from 'react';
import { Route, BrowserRouter as Router ,Routes} from 'react-router-dom';
import UserListPage from './Component/UserlistPage';
import UserDetailsPage from './Component/UserDetailsPage';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
   <Router>
   
      <Routes>
      <Route exact path="/" element={<UserListPage users={users}/>}/>
      <Route  path='/user/:username' element={<UserDetailsPage />}/>
      </Routes>
    
   </Router>
  );
}

export default App;
