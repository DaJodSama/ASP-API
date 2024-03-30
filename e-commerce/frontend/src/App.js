import Header from "./layouts/Header";
import "./assets/sass/app.scss";
import Footer from "./layouts/Footer";
import Main from "./layouts/Main";
import { useState } from "react";
function App() {
	const [loggedInUser, setLoggedInUser ] = useState(null);
	return (
		<div>
			<Header loggedInUser={loggedInUser} setLoggedInUser ={setLoggedInUser } />
			<Main />
			<Footer />
		</div>
	);
}
export default App;
