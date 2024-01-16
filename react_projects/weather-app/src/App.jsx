// import { useState } from "react";
import Header from "./Header";
import Hourly from "./Hourly";
// import "./App.css";
import CurrentWeather from "./CurrentWeather";
import Weekly from "./Weekly";

function App() {
	return (
		<div className="bg-main-dark d-flex flex-column">
			<Header />
			<section className="d-flex flex-column p-5">
				<CurrentWeather />
				<Hourly />
				<Weekly />
			</section>
		</div>
	);
}

export default App;
