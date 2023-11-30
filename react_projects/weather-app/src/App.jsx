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
			<section className="d-flex flex-column p-5">
				<TodaysWeather />
				<Hourly />
				<Weekly />
			</section>
		</div>
	);
}

export default App;
