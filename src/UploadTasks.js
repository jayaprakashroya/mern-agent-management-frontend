import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UploadTasks() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [groups, setGroups] = useState([]);

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Tasks uploaded and distributed successfully');
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Upload failed');
    }
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/agent-tasks`, { headers: { Authorization: `Bearer ${token}` } });
    setGroups(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload and Distribute</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Tasks distribution per agent</h3>
      {groups.map(group => (
        <div key={group.agent?._id || Math.random()}>
          <h4>
            {group.agent?.name || 'Unknown'} ({group.agent?.email || 'No email'})
          </h4>
          <ul>
            {(group.tasks || []).map(task => (
              <li key={task._id || Math.random()}>
                {task.firstName || 'No name'} - {task.phone || 'No phone'} - {task.notes || ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
