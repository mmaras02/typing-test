import { useEffect, useRef, useState, createRef } from "react";
import "../styles/global.css";
import { generate } from "random-words";
import TopMenu from "./TopMenu";
import { useTestMode } from "../context/TestModeContext";
import Stats from "./Stats";

const TypingTest = () => {
    
    const {testMode, testWords, testSeconds, setTestSeconds} = useTestMode();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [charStatus, setcharStatus] = useState([]);
    const [correctChars, setCorrectChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [testEnd, setTestEnd] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [initialTime,setInitialTime] = useState(null);
    const [performanceData, setPerformanceData] = useState([]);

    const inputRef = useRef(null);
    const wordRefs = useRef([]);

    const focusInput = () => {
        inputRef?.current?.focus({ preventScroll: true });
      };

    useEffect(() => {
        let words;

        console.log("testMode", testMode);
        if(testMode === 'time'){
            words = generate(300);
        }else{
            words = generate(testWords);
        }

        console.log("hey",words);
        setText(words);
        setcharStatus(words.map(word => Array(word.length).fill(null)));
        setLoading(false);
        focusInput();

    },[testWords, testMode]);

    const updateCharStatus = (wordIndex, charIndex, status) => {
        setcharStatus((prev) => {
          const newCharStatus = [...prev];
          newCharStatus[wordIndex] = [...newCharStatus[wordIndex]];
          newCharStatus[wordIndex][charIndex] = status;
          return newCharStatus;
        });
    };

    useEffect(() => {
        if (testStarted) {
            //updatePerformanceData();
            let timer;
            if (testMode === 'time' && testSeconds > 0) {
                timer = setInterval(() => {
                    setTestSeconds((prev) => prev - 1);
                }, 1000);
            } else if (testMode === 'time' && testSeconds === 0) {
                setTestEnd(true);
                setTestStarted(false);
            }
            return () => clearInterval(timer);
        }
    }, [testStarted, testSeconds, testMode]);

    const resetTest = () => {
        setLoading(true);
        clearInterval();
        setCurrentCharIndex(0);
        setCurrentWordIndex(0);
        setTestStarted(false);
        setTestEnd(false);

        let words;
        if(testMode === 'time'){
            words = generate(300);
            setTestSeconds(testSeconds);
        }else{
            words = generate(testWords)
        }
        setText(words);
        setcharStatus(words.map((word) => Array(word.length).fill(null)));
        setPerformanceData([]);
        setCorrectChars(0);
        setCorrectWords(0);
        setExtraChars(0);
        setIncorrectChars(0);
        setMissedChars(0);
        focusInput();

    }


    const onKeyDown = (e) => {
        e.preventDefault();

        if (testEnd) return;

        if(!testStarted && !testEnd){
            setTestStarted(true);
            setInitialTime(testMode === 'words' ? Date.now() : testSeconds);
        }

        const currentWord = text[currentWordIndex];
        const currentChar = currentWord[currentCharIndex];

        //space handling
        if(e.key === " " || e.key === "Enter"){

            console.log("correct words", correctWords);
            if(currentWordIndex + 1 === testWords)
                setTestEnd(true);

            if(currentWord.split('').every((char, index) => charStatus[currentWordIndex][index] === 'correct')){
                setCorrectWords(prev => prev + 1);
            }
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setCurrentCharIndex(0);
            setUserInput("");

            updatePerformanceData();
            handleScroll();
            return;
        }

        //backspace hendling
        if (e.key === "Backspace") {
            if (currentCharIndex > 0) {
                setCurrentCharIndex((prevIndex) => prevIndex - 1);
                setUserInput((prev) => prev.slice(0, -1));

                if (charStatus[currentWordIndex][currentCharIndex - 1]  === 'incorrect extra') {
                    setText((prev) => {
                        const newText = [...prev];
                        newText[currentWordIndex] = newText[currentWordIndex].slice(0, -1);
                        return newText;
                    });
                    setExtraChars(prev => prev - 1);
                }else{
                    updateCharStatus(currentWordIndex, currentCharIndex - 1, null);
                }
            }
            return;
        }
    
        // handling extra letters
        if (currentCharIndex >= currentWord.length) {
            setText((prev) => {
                const newText = [...prev];
                newText[currentWordIndex] += e.key; 
                return newText;
            });
            updateCharStatus(currentWordIndex, currentCharIndex, 'incorrect extra');
            setUserInput((prev) => prev + e.key);
            setExtraChars(prev => prev + 1); 
            //setIncorrectChars((prev) => prev + 1);
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
            return;
        }

        //normal situations
        if(e.key === currentChar){
            updateCharStatus(currentWordIndex, currentCharIndex, 'correct');
            setCorrectChars(prev => prev + 1);
        }
        else{
            updateCharStatus(currentWordIndex, currentCharIndex, 'incorrect');
            setIncorrectChars(prev => prev + 1);
        }
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
    }


    const handleScroll = () => {
        const nextWord = wordRefs[currentWordIndex + 1];

        if(nextWord && nextWord.offsetLeft === 0){
            nextWord.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    const updatePerformanceData = () => {
        const elapsedTimeInSeconds = testMode === 'time'
            ? ( initialTime - testSeconds)
            : (Date.now() - initialTime) / 1000;
        
        setPerformanceData(prev => [
            ...prev, {time: Math.round(elapsedTimeInSeconds), wpm: calculateWPM(), accuracy: calculateAccuracy()},
        ]);
    };

    const calculateAccuracy = () => {
        return Math.round((correctWords / currentWordIndex) * 100);
      };

    const calculateWPM = () => {
        const elapsedTimeInSeconds = testMode === 'time'
            ? ( initialTime - testSeconds)
            : (Date.now() - initialTime) / 1000;

        const time = 60 / elapsedTimeInSeconds;
        
        if(testMode === 'time'){
            return Math.round((correctChars / 5) * time);
        }else{
            return Math.round(correctWords * time);
        }
    };

    return ( 
        <>
            
            <div className="center-box">
                {testEnd ? (
                    <Stats wpm={calculateWPM()}
                                accuracy={calculateAccuracy()}
                                performanceData={performanceData}
                                correctChars={correctChars}
                                incorrectChars={incorrectChars}
                                missedChars={missedChars}
                                extraChars={extraChars}
                                resetTest={resetTest}
                                />
                ) : (
                    <>
                    <TopMenu currentWordIndex={currentWordIndex} countDown={testSeconds}  />

                    <div className="text-box" onClick={focusInput}>
                        {loading ? (
                            <p>Loading story...</p>
                        ) : (
                            <div className="words">
                                {text.map((word, wordIndex) => (
                                    <div className="word" key={wordIndex} ref={el => wordRefs[wordIndex] = el}>
                                        {word.split('').map((char, charIndex) => (
                                            
                                            <span key={`${wordIndex}-${charIndex}`} 
                                                  className={`char ${wordIndex === currentWordIndex && charIndex === currentCharIndex ? "active" : ""} ${charStatus[wordIndex][charIndex]}`}>{char}
                                            </span>
                                        ))}
                                </div>
                            ))}
                            </div>
                        )}
                        <input type="text"
                                className="hidden-input"
                                ref={inputRef} 
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                autoFocus/>
                    </div>
                    </>
                )}
                
            </div>
        </>
     );

}
export default TypingTest;