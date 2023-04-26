import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar() {
	return (
		<div className={styles.navContainer}>
			<ul>
				<li>
					<Link to="/" className={styles.logo}>
						Dragon Productions
					</Link>
				</li>
				<li>
					<Link to="/home">Homepage</Link>
				</li>
				<li>
					<Link to="/user_comments">My Comments</Link>
				</li>
				<li>
					<Link to="/search">Search</Link>
				</li>
				<li>
					<Link to="/logout">Logout</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
