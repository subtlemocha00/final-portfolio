export default function CurrentWeather() {
	return (
		<div id="currentWeather" className="container">
			<section className="row d-flex align-items-center justify-content-center">
				<span className="col-auto">70 &deg;C</span>
				<div className="col-auto">
					<p className="row m-0">cloudy</p>
					<span className="row m-0">London, ON</span>
				</div>
			</section>
		</div>
	);
}
