import React from 'react';
import Graph from './Graph';

const Stats = ({wpm, accuracy, performanceData, correctChars, incorrectChars, missedChars, extraChars, resetTest }) => {

  return (
    <div className="results-content">
        <div className="stats">
            <div className='wpm'>
                <p>wpm</p> 
                <span className='data'>{wpm}</span>
            </div>
            <div className='acc'>
                <p>acc</p> 
                <span className='data'>{accuracy}%</span>
            </div>
        </div>
        <div className="graph">
            <Graph performanceData={performanceData}/>
        </div>
        <div className="char-status">
          <p>characters</p>
          <span className='data'>{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</span>
          {/*<button onClick={resetTest}>reset Test</button>*/}
        </div>
    </div>
  );
};

export default Stats;