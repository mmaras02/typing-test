import React from 'react';
import Graph from './Graph';

const Stats = ({wpm, accuracy, performanceData, correctChars, incorrectChars, missedChars, extraChars }) => {

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
            <Graph performanceData={performanceData}/>
        </div>
        <div className="char-status">
          <p>characters</p>
          <span>{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</span>
        </div>
    </div>
  );
};

export default Stats;