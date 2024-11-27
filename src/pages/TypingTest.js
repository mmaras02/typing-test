import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import "./typing-test.css";
import { generate, count } from "random-words";


const TypingTest = () => {
    const location = useLocation();
    const {testDuration, testDifficulty} = location.state;
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isCharCorrect, setIsCharCorrect] = useState(null);

    const [correctWrongChar, setCorrectWrongChar] = useState([]);
    
    const inputRef = useRef(null);
    const charRefs = useRef([]);

    const focusInput = () => {
        inputRef?.current.focus();
      };

    useEffect(() => {
        const words = generate(20);
        console.log("words", words);
        setText(words);
        setCorrectWrongChar(words.map(word => Array(word.length).fill(null)));
        setLoading(false);
        focusInput();
    },[])

    const handleUserInput = (e) => { //problem oznacavaju se sva prva slova svake rijeci sta znaci da nmg stavljat char na 0 za svaki rijec

        //const characters = charRefs.current; //access all the characters
        //console.log("characters", characters);
        const input = e.target.value;
        setUserInput(input);
        console.log("input", input);

        const activeWord = text[currentWordIndex]; //active word
        //let activeChar = charRefs.current[currentCharIndex]; //active char
        const activeChar = activeWord[currentCharIndex];

        console.log("active word", activeWord);
        console.log("active char", activeChar);

        //for space bar go current word is +1
        if(input.endsWith(" ")){
            
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setCurrentCharIndex(0);
            //setCorrectWrongChar([]);
            //setUserInput("");
            console.log("wtf");
            return;
        }
        //input usporedi s active rijeci 

        if(input[input.length - 1] === activeChar){
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
            console.log("correct");
            setCorrectWrongChar(prev => {
                const newCorrectWrongChar = [...prev];
                newCorrectWrongChar[currentWordIndex][currentCharIndex] = "correct";
                return newCorrectWrongChar;
            });
        }else{
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
            console.log("wrong");
            setCorrectWrongChar(prev => {
                const newCorrectWrongChar = [...prev];
                newCorrectWrongChar[currentWordIndex][currentCharIndex] = "wrong";
                return newCorrectWrongChar;
            });
            
        }
    }
    const checkMatch = () => {
    }
    return ( 
        <>
        
        <div className="test-container">
            {/*<div className="header">
                <h1>{testDuration} Typing Test</h1>
            </div>*/}
            <div className="text-box" onClick={focusInput}>
                {loading ? (
                    <p>Loading story...</p>
                ) : (
                    <div className="words">
                        {text.map((word, wordIndex) => (
                            <div className="word" key={wordIndex}>
                                {word.split('').map((char, charIndex) => (
                                    
                                    <span key={`${wordIndex}-${charIndex}`} className={`char ${wordIndex === currentWordIndex && charIndex === currentCharIndex ? "active" : ""} ${correctWrongChar[wordIndex][charIndex]}`}>{char}</span>
                                ))}
                        </div>
                    ))}
                    </div>
                )}
                <textarea type="text"
                          className="hidden-input"
                          ref={inputRef} 
                          onChange={handleUserInput}
                          value={userInput}
                          autoFocus/>
            </div>
        </div>
        </>
     );
}
 
export default TypingTest;

//moran vidit je li rijec aktivna ili ne
//rijec koja je aktivna provjerit svako slovo s user input

//mapirat kroz svaku rijec i onda kroz svako slovo pa provjeravat 

//https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap

//<p className={`char ${index === currentCharIndex && isCharCorrect ? 'correct' : 'mistake'}`}>{char}</p>