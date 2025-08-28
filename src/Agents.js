import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAgents = async () => {
    const token = localStorage.getItem('token');
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/agents`, { headers: { Authorization: `Bearer ${token}` } });
    setAgents(res.data);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/agents`, form, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Agent added successfully');
      setForm({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add agent');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile with country code" value={form.mobile} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Add Agent</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
      <h3>Agents List</h3>
      <ul>
        {agents.map(agent => <li key={agent._id}>{agent.name} - {agent.email}</li>)}
      </ul>
    </div>
  );
}
