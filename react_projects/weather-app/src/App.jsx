// import { useState } from "react";
import Header from "./Header";
// import "./App.css";
import TodaysWeather from "./TodaysWeather";

function App() {
	return (
		<div className="bg-main-dark">
			<Header />
			<TodaysWeather />
			{/* <Hourly /> */}
		</div>
	);
}

export default App;
