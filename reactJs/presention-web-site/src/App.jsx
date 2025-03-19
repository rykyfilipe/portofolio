/** @format */

import Home from "./Home/Home";
import Content from "./Content/Content";

function App() {
	return (
		<>
			<Home />
			<Content classId='content1' key='content1' />
			<Content classId='content2' key='content2' />
		</>
	);
}

export default App;
