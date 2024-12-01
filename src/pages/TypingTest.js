import { useEffect, useRef, useState } from "react";
import "./typing-test.css";
import { generate } from "random-words";
import TopMenu from "../components/TopMenu";
import { useTestMode } from "../context/TestModeContext";
import ResultData from "../components/ResultData";


const TypingTest = () => {

    const {testMode, testWords, testSeconds, setTestSeconds} = useTestMode();

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const [correctWrongChars, setCorrectWrongChars] = useState([]);
    const [correctChars, setCorrectChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChar, setIncorrectChar] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [testStarted, setTestStarted] = useState(false);

    const [initialTime,setInitialTime] = useState(null);

    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef?.current.focus();
      };

    useEffect(() => {
        const words = generate(testWords);
        setText(words);
        setCorrectWrongChars(words.map(word => Array(word.length).fill(null)));
        setLoading(false);
        focusInput();
    },[testWords]);

    const updateCharStatus = (wordIndex, charIndex, status) => {
        setCorrectWrongChars((prev) => {
          const newCorrectWrongChar = [...prev];
          newCorrectWrongChar[wordIndex] = [...newCorrectWrongChar[wordIndex]];
          newCorrectWrongChar[wordIndex][charIndex] = status;
          return newCorrectWrongChar;
        });
    };

    useEffect(() => {
        let timer;
        if (testMode === 'time' && testStarted &&  testSeconds > 0) {
            timer = setInterval(() => {
                setTestSeconds((prev) => prev - 1);
            }, 1000);
        } else if (testMode==='time' && testSeconds === 0) {
            setIsFinished(true);
            setTestStarted(false);
        }
    
        return () => clearInterval(timer);
    }, [testStarted, testSeconds],testMode);

    const onKeyDown = (e) => {
        if(!testStarted){
            setTestStarted(true);
            setInitialTime(testMode === 'words' ? Date.now() : testSeconds);
        }

        const currentWord = text[currentWordIndex];
        const currentChar = currentWord[currentCharIndex];

        //space handling
        if(e.key === " " || e.key === "Enter"){

            if(currentWordIndex + 1 === testWords)
                setIsFinished(true);

            if(userInput.trim() === currentWord){
                setCorrectWords(prev => prev + 1);
            }
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setCurrentCharIndex(0);
            setUserInput("");
            return;
        }

        //backspace hendling
        if (e.key === "Backspace") {
            if (currentCharIndex > 0) {
                setCurrentCharIndex((prevIndex) => prevIndex - 1);
                setUserInput((prev) => prev.slice(0, -1));

                if (correctWrongChars[currentWordIndex][currentCharIndex - 1]  === "incorrect extra") {
                    setText((prev) => {
                        const newText = [...prev];
                        newText[currentWordIndex] = newText[currentWordIndex].slice(0, -1);
                        return newText;
                    });
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
            updateCharStatus(currentWordIndex, currentCharIndex, "incorrect extra");
            setUserInput((prev) => prev + e.key); 
            setIncorrectChar((prev) => prev + 1); 
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
            return;
        }

        //normal situations
        if(e.key === currentChar){
            updateCharStatus(currentWordIndex, currentCharIndex, "correct");
            setCorrectChars(prev => prev + 1);
        }
        else{
            updateCharStatus(currentWordIndex, currentCharIndex, "incorrect");
        }
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
    }

    const calculateAccuracy = () => {
        return Math.round((correctWords / currentWordIndex) * 100);
      };

    const calculateWPM = () => {
        if (!initialTime) return 0;

        const elapsedTimeInSeconds = testMode === 'time'
            ? (testSeconds === 0 ? initialTime : initialTime - testSeconds)
            : (Date.now() - initialTime) / 1000;

        if (elapsedTimeInSeconds === 0) return 0;

        const multiplier = 60 / elapsedTimeInSeconds; // Factor to convert seconds to minutes
        return testMode === 'time'
            ? Math.round((correctChars / 5) * multiplier) // Time mode: use characters
            : Math.round(correctWords * multiplier); 

            /*const wordsTyped = correctWords;
            const minutes = (Date.now() - initialTime) / 60000;
            return Math.round(wordsTyped / minutes);*/
    };
    

    return ( 
        <>
            
            <div className="center-box">
                {isFinished ? (
                    <ResultData wpm={calculateWPM()}
                                accuracy={calculateAccuracy()}
                                />
                ) : (
                    <>
                    <TopMenu currentWordIndex={currentWordIndex} countDown={testSeconds} />

                    <div className="text-box" onClick={focusInput}>
                        {loading ? (
                            <p>Loading story...</p>
                        ) : (
                            <div className="words">
                                {text.map((word, wordIndex) => (
                                    <div className="word" key={wordIndex}>
                                        {word.split('').map((char, charIndex) => (
                                            
                                            <span key={`${wordIndex}-${charIndex}`} className={`char ${wordIndex === currentWordIndex && charIndex === currentCharIndex ? "active" : ""} ${correctWrongChars[wordIndex][charIndex]}`}>{char}</span>
                                        ))}
                                </div>
                            ))}
                            </div>
                        )}
                        <textarea type="text"
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