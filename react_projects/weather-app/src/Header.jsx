export default function Header() {
	return (
		<section className="p-3 bg-secondary text-center text-warning">
			<h3>Weather For You</h3>
			<div className="input-group p-3 bg-secondary m-0">
				<div className="form-outline"></div>
				<input
					id="searchInput"
					className="form-control"
					type="search"
					placeholder="Search..."
				></input>
				<label className="form-label sr-only" htmlFor="searchInput">
					Search
				</label>
				<button
					id="searchBtn"
					type="button"
					className="btn btn-warning text-secondary"
				>
					<i className="fas fa-magnifying-glass "></i>
				</button>
			</div>
		</section>
	);
}
