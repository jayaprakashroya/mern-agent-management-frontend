import React, { useEffect, useState } from 'react';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://mern-agent-backend-1.onrender.com/') // Your backend API URL
      .then(response => response.json())
      .then(data => {
        setAgents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching agents:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading agents...</p>;
  }

  return (
    <div>
      <h2>Agent List</h2>
      {agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <ul>
          {agents.map(agent => (
            <li key={agent._id}>
              {agent.name} - {agent.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Agents;
