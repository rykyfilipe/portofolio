/** @format */

import Home from "./Home/Home";
import Content from "./Content/Content";

function App() {
	return (
		<>
			<Home />
			<Content class='content1' key='content1' />
			<Content class='content2' key='content2' />
		</>
	);
}

export default App;
