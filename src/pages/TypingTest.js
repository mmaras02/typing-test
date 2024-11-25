import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./typing-test.css";
import { generate, count } from "random-words";

const TypingTest = () => {
    const location = useLocation();
    const {testDuration, testDifficulty} = location.state;
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const words = generate(20);
        console.log("words", words);
        setText(words);
        setLoading(false);
    },[])

    console.log("text", text);

    const handleUserInput = (e) => {
        const input = e.target.value;
        console.log("input", input);
        //input usporedi s active rijeci

    }
    return ( 
        <>
        
        <div className="test-container">
            {/*<div className="header">
                <h1>{testDuration} Typing Test</h1>
            </div>*/}
            <div className="text-box">
                {loading ? (
                    <p>Loading story...</p>
                ) : (
                    <div className="words">
                        {text.map((word, index) => (
                            <div className="word" key={index}>
                                {word.split('').map(char => (
                                    <p>{char}</p>
                                ))}
                        </div>
                    ))}
                    </div>
                )}
            </div>
            {/*<input className="user-input" placeholder="start typing" onChange={handleUserInput}></input>*/}
        </div>
        </>
     );
}
 
export default TypingTest;

//moran vidit je li rijec aktivna ili ne
//rijec koja je aktivna provjerit svako slovo s user input

//mapirat kroz svaku rijec i onda kroz svako slovo pa provjeravat 

//https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap