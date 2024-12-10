import { useEffect, useState } from "react";
import "./ResponsiveAlert.css";

function ResponsiveAlert() {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth <= 768);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return (
		isSmallScreen && (
			<div className="alertBox">
				<p className="alertText">
					Pour une meilleure expérience, veuillez consulter ce site sur un
					ordinateur ou un appareil avec un écran plus large.
				</p>
			</div>
		)
	);
}

export default ResponsiveAlert;
