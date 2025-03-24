/** @format */

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/Login/ForgotPassword";
import SignUp from "./Components/Login/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</Router>
	);
}

export default App;
