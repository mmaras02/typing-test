import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeProvider = ({children}) => {

    const [testMode, setTestMode] = useState('time');
    const [testWords, setTestWords] = useState(20);
    const [testSeconds, setTestSeconds] = useState(15);
    
    return (
        <TestModeContext.Provider
          value={{
            testMode,
            setTestMode,
            testWords,
            setTestWords,
            testSeconds,
            setTestSeconds
          }}
        >
          {children}
        </TestModeContext.Provider>
      );
};
export const useTestMode = () => useContext(TestModeContext);