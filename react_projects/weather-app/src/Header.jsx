export default function Header() {
	return (
		<section className="bg-secondary text-center text-warning">
			<div className="input-group bg-secondary m-0 p-0">
				<div className="btn">
					<i className="fas fa-cloud text-white"></i>
				</div>
				<input
					id="searchInput"
					className="form-control p-3 m-0"
					type="search"
					placeholder="Search..."
				></input>
				<label className="form-label sr-only" htmlFor="searchInput">
					Search
				</label>
				<div className="bg-warning text-secondary">
					<i className="fas fa-clock "> Sunday 9:31 PM</i>
				</div>
			</div>
		</section>
	);
}
