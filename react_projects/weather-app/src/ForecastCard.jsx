import { v4 as uuid4 } from "uuid";

export default function ForecastCard({ weekday, condition, temp }) {
	return (
		<li
			key={uuid4()}
			className="list-group-item card d-flex flex-column align-items-center"
		>
			<span>{weekday}</span>
			{condition}
			<i className="fas fa-cloud-rain"></i>
			<span>{temp}</span>
		</li>
	);
}
