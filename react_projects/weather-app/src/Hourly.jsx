import { useEffect } from "react";
import Chart from "chart.js/auto";
import data from "./WeatherData";
export default function Hourly() {
	useEffect(() => {
		const canvas = document.getElementById("hourlyGraph");
		canvas.height = 70;
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
		<div className="container d-flex justify-content-center p-0">
			<canvas id="hourlyGraph" className="p-2 canvas" />
		</div>
	);
}
