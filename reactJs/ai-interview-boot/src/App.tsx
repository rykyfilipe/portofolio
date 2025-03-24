/** @format */

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
