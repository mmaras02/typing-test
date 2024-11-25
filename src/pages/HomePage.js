import { useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import { useNavigate, useParams } from "react-router-dom";
import TypingTest from "./TypingTest";

const HomePage = () => {
    const [selectedDuration, setSelectedDuration] = useState("30 seconds");
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
    const navigate = useNavigate();

    const durationOptions = [
        { value: '30 Seconds', label: '30 Seconds' },
        { value: '1 Minute', label: '1 Minute'},
        { value: '2 Minutes', label: '2 Minutes' },
        { value: '3 Minutes', label: '3 Minutes' },
        ];

    const difficultyOptions = [
        { value: 'easy', label: 'Easy Text' },
        { value: 'medium', label: 'Medium Text'},
        { value: 'hard', label: 'Hard Text' },
        { value: 'extreme', label: 'Extreme Text' },
        ];

    
    const handleStart = () => {
        navigate("/typing-test",
            {state: {
                testDuration:selectedDuration,
                testDifficulty: selectedDifficulty,
            }}
        )
    }
    return ( 
        <div className="home-container">
            <div className="home-box">
                <div className="home-header">
                    <h1>Welcome to Typing test</h1>
                    <h3>Test your typing skills right away!</h3>
                    <h4>SELECT YOUR TEST</h4>
                </div>

                <div className="home-content">
                    <DropdownMenu options={durationOptions}
                                selectedOption={selectedDuration}
                                setSelectedOption={setSelectedDuration}/>

                    <DropdownMenu options={difficultyOptions}
                                selectedOption={selectedDifficulty}
                                setSelectedOption={setSelectedDifficulty}/>
                    
                </div>
                <button className="start-button" onClick={handleStart}>START</button>
            </div>
        </div>
     );
}
 
export default HomePage;

//posaljen u dropdown selectedDuration i nap niz di su sve vrijednost
// prvo za vrijeme onda za difficulty level