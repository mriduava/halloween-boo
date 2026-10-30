import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/app.scss';
import Puzzle from "./welcome/Puzzle";

const App = () => {
  return (
    <Router>
		<Routes>
			<Route path="/" element={<Puzzle />} />
		</Routes>
    </Router>
  );
}

export default App;
