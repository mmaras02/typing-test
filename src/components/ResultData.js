import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  // Import Recharts components

const ResultData = ({wpm, accuracy }) => {

  return (
    <div className="results-content">
        <div className="stats">
            <div className='wpm'>
                <p>wpm</p> 
                <p className='data'>{wpm}</p>
            </div>
            <div className='acc'>
                <p>acc</p> 
                <p className='data'>{accuracy} %</p>
            </div>
        </div>
        <div className="graph">
            <p>helo</p>
        </div>
    </div>
  );
};

export default ResultData;


/**<div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div> */