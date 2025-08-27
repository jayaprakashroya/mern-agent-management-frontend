import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Agents from './agents';
import Login from './login';
import UploadTasks from './Uploadtasks';

function App() {
  return (
    <Router>
      <div>
        <h1>MERN Agent Management</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Agents />} />
          <Route path="/upload-tasks" element={<UploadTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
