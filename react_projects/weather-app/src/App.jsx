// import { useState } from "react";
import Header from "./Header";
import Hourly from "./Hourly";
// import "./App.css";
import TodaysWeather from "./TodaysWeather";
import Weekly from "./Weekly";

function App() {
	return (
		<div className="bg-main-dark d-flex flex-column">
			<Header />
			<TodaysWeather />
			<Hourly />
			<Weekly />
		</div>
	);
}

export default App;
