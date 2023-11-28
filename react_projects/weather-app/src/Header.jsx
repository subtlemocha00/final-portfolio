export default function Header() {
	return (
		<section className="text-center">
			<div className="input-group bg-main-light m-0 p-0">
				<div className="d-flex align-items-center bg-main-blue px-4">
					<i className="fas fa-cloud-sun-rain text-white"></i>
				</div>
				<input
					id="searchInput"
					className="form-control p-3 m-0 bg-main-light border-0"
					type="text"
					placeholder="Search..."
				></input>
				<label className="form-label sr-only" htmlFor="searchInput">
					Search
				</label>
				<div className="text-white p-1 me-3 d-flex align-items-center">
					<i className="fas fa-clock p-1"></i> Sunday 9:31 PM
				</div>
			</div>
		</section>
	);
}
