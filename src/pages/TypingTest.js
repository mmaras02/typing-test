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

    const [correctWrongChars, setCorrectWrongChars] = useState([]);
    const [correctChars, setCorrecChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChar, setIncorrectChar] = useState(0);
    const passedTime = testDuration / 60;

    const inputRef = useRef(null);
    //const wordRefs = useRef([]);
    //const charRefs = useRef([]);

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
    
        // Handling extra letters
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
            setCorrecChars(prev => prev + 1);
        }
        else{
            updateCharStatus(currentWordIndex, currentCharIndex, "incorrect");
        }
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
    }

    const calculateAccuracy = () => {
        const totalWordsTyped = userInput.split(" ").length;

        const nwpm = correctWords / passedTime;
        const gwpm = totalWordsTyped / passedTime;
        return Math.round((nwpm*100) / gwpm);
    }

    const calculateSpeed = () => {
        const allTypedChar = userInput.length;
        console.log("all typed ", allTypedChar);
        return Math.round((allTypedChar / 5) / passedTime);
    }

    return ( 
        <>
        
        <div className="test-container">
            
            <div className="center-box">
                <div className="top-menu">
                    <h2>{currentWordIndex} / 20</h2>
                    <div className="mode-menu">
                        <h4>Mode |</h4>
                        <button className="option-button">Time</button>
                        <button className="option-button active">Words</button>
                    </div>
                    <div className="options-menu">
                        <button className="option-button active">20</button>
                        <button className="option-button">30</button>
                        <button className="option-button">50</button>
                    </div>
                </div>

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