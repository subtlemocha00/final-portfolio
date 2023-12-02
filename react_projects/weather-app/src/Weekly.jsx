import ForecastCard from "./ForecastCard";
import { v4 as uuid4 } from "uuid";
export default function Weekly() {
	const forecast = [
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
		{ weekday: "Monday", condition: "rainy", tempC: "17 C", tempF: "72 F" },
	];
	return (
		<ul className="border border-white flex-row justify-content-around list-group">
			{forecast.map((element) => {
				return (
					<ForecastCard
						key={uuid4()}
						weekday={element.weekday}
						condition={element.condition}
						temp={element.tempC}
						// tempF={element.tempF}
					/>
				);
			})}
		</ul>
	);
}
{
	/* <li
	key={uuid4()}
	className="list-group-item card d-flex flex-column align-items-center"
>
	<span>{element.weekday}</span>
	<i className="fas fa-cloud"></i>
	<span>{element.tempC}</span>
</li> */
}
