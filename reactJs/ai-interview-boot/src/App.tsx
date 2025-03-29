/** @format */

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/Login/ForgotPassword";
import SignUp from "./Components/Login/SignUp";
import ChangePassword from "./Components/Login/ChangePassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/login/forgot-password' element={<ForgotPassword />} />
				<Route
					path='/forgot-password/change-password'
					element={<ChangePassword />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
