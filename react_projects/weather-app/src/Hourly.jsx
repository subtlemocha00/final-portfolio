import { useEffect } from "react";
import Chart from "chart.js/auto";
import data from "./WeatherData";
export default function Hourly() {
	useEffect(() => {
		const canvas = document.getElementById("hourlyGraph");
		canvas.height = 60;
		const ctx = canvas.getContext("2d");
		const myChart = new Chart(ctx, {
			type: "line",
			data: data,
			options: {
				scales: {
					x: {
						ticks: { color: "white" },
						grid: { display: false },
					},
					y: {
						display: false,
						suggestedMin: 44,
						suggestedMax: 100,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});

		return () => myChart.destroy();
	}, []);
	return (
		<div className="container d-flex flex-column justify-content-center align-items-center p-0">
			<canvas id="hourlyGraph" className="p-2 canvas" />
			<div className="d-flex mb-5">
				<div className="btn mx-3 bg-transparent font-white border-0 text-light">
					Temperature
				</div>
				<div className="btn mx-3 bg-transparent border-0  text-light">
					Precipitation
				</div>
				<div className="btn mx-3 bg-transparent border-0 text-light">
					Air Index
				</div>
			</div>
		</div>
	);
}
