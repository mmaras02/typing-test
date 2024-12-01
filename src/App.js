import './App.css';
import HomePage from './pages/HomePage';
import TypingTest from './pages/TypingTest';
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element = {<HomePage />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
