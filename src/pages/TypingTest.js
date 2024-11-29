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

    const [correctWrongChars, setCorrectWrongChars] = useState([]);
    const [correctChars, setCorrecChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChar, setIncorrectChar] = useState(0);
    
    const inputRef = useRef(null);
    const wordRefs = useRef([]);
    const charRefs = useRef([]);

    const focusInput = () => {
        inputRef?.current.focus();
      };

    useEffect(() => {
        const words = generate(20);
        setText(words);
        setCorrectWrongChars(words.map(word => Array(word.length).fill(null)));
        setLoading(false);
        focusInput();
    },[])


    const updateCharStatus = (wordIndex, charIndex, status) => {
        setCorrectWrongChars((prev) => {
          const newCorrectWrongChar = [...prev];
          newCorrectWrongChar[wordIndex] = [...newCorrectWrongChar[wordIndex]];
          newCorrectWrongChar[wordIndex][charIndex] = status;
          return newCorrectWrongChar;
        });
    };

    const onKeyDown = (e) => {
        const currentWord = text[currentWordIndex];
        const currentChar = currentWord[currentCharIndex];

        //space handling
        if(e.key === " " || e.key === "Enter"){
            console.log("user input", userInput.trim());
            if(userInput.trim() === currentWord){
                setCorrectWords(prev => prev + 1);
            }
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
            setCurrentCharIndex(0);
            setUserInput("");
            return;
        }

        //backspace hendling
        if(e.key === "Backspace"){
            if(currentCharIndex > 0){
                setCurrentCharIndex(prevIndex => prevIndex - 1); //vracamo se jedan unazad i tog unazad updateamo status
                updateCharStatus(currentWordIndex, currentCharIndex - 1, null);
                setUserInput(prev => prev.slice(0, -1));
            }
            return;
        }

        //normal situations
        if(e.key === currentChar){
            updateCharStatus(currentWordIndex, currentCharIndex, "correct");
            setCorrecChars(prev => prev + 1);
        }
        else{
            updateCharStatus(currentWordIndex, currentCharIndex, "incorrect");
        }
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
    }

    const calculateAccuracy = () => {
        const totalWordsTyped = userInput.split(" ").length;
        const passedTime = testDuration / 60;

        const nwpm = correctWords / passedTime;
        const gwpm = totalWordsTyped / passedTime;
        return Math.round((nwpm*100) / gwpm);
    }

    const calculateSpeed = () => {
        const allTypedChar = userInput.length;
        console.log("all typed ", allTypedChar);
        const passedTime = testDuration / 60;
        return Math.round((allTypedChar / 5) / passedTime);
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


//moran nap prvo slovo --> current 
//ako je tocan char pridjelim mu class name 
//situacije:
//backspace--> delete letter prebious letter is currrent
//space--> if input equals active word --> move to he next word 
//         if user types space in incorrect place display as wrong and continue normally 
//extra letters --> keep track of letters and num of spaces and words and depending on which char i am count which word it is and whictch char

//ovisno koliko je vrimena rijeci se pojavljuju 
//moran pratit koliko mistakes

//https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap

//<p className={`char ${index === currentCharIndex && isCharCorrect ? 'correct' : 'mistake'}`}>{char}</p>