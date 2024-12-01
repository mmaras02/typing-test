import { useTestMode } from "../context/TestModeContext";

const TopMenu = ({currentWordIndex, countDown}) => {

    const {testMode, setTestMode,  testWords, setTestWords, testSeconds, setTestSeconds} = useTestMode();

    return ( 
        <div className="top-menu">
            <div className="counter">
                {testMode==='time' ? (
                    <p>{countDown}</p>
                ):(
                    <p>{currentWordIndex} / {testWords}</p>
                )}
            </div>
            
            <div className="modes-menu">
                <h4>Mode |</h4>
                <button className={`option-button ${testMode === 'words' ? 'active' : ""}`} onClick={(e) => setTestMode('words')}>Words</button>
                <button className={`option-button ${testMode === 'time' ? 'active' : ""}`} onClick={(e) => setTestMode('time')}>Time</button>
            </div>
            <div className="options-menu">
                {testMode === 'time' ? (
                    <>
                        <button className={`option-button ${testSeconds === 15 ? 'active' : ""}`} onClick={() => setTestSeconds(15)}>15</button>
                        <button className={`option-button ${testSeconds === 30 ? 'active' : ""}`} onClick={() => setTestSeconds(30)}>30</button>
                        <button className={`option-button ${testSeconds === 60 ? 'active' : ""}`} onClick={() => setTestSeconds(60)}>60</button>
                    </>
                    
                ) : (
                    <>
                        <button className={`option-button ${testWords === 20 ? 'active' : ""}`} onClick={() => setTestWords(20)}>20</button>
                        <button className={`option-button ${testWords === 30 ? 'active' : ""}`} onClick={() => setTestWords(30)}>30</button>
                        <button className={`option-button ${testWords === 50 ? 'active' : ""}`} onClick={() => setTestWords(50)}>50</button>
                    </>
                    
                )}
            
            </div>
        </div>
     );
}
 
export default TopMenu;
