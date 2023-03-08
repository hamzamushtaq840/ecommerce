import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from './context/AuthProvider';

function App() {
  const { setAuth } = useContext(AuthContext)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/user/login', { email, password })
      .then((response) => {
        console.log(response.data);
        setAuth(response.data)
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  return (
    <div className="App">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
