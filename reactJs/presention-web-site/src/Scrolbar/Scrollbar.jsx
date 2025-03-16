/** @format */

import "./Scrollbar.css";
import { useState, useRef, useEffect } from "react";

function useWindowSize() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
			const bar = document.querySelector(".bar");

			bar.classList.add("moving");
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
}

function Scrollbar() {
	const pageWidth = useWindowSize();
	const [position, setPosition] = useState([210, 78]);
	const linksRef = useRef([]);

	useEffect(() => {
		if (pageWidth < 768) {
			setPosition([48.5, 262]);
		} else {
			setPosition([210, pageWidth - 82]);
		}
	}, [pageWidth]);

	const handleClick = (index) => {
		const linkElement = linksRef.current[index];

		if (linkElement) {
			const newTop = linkElement.offsetTop;
			const newLeft = linkElement.offsetLeft;
			const bar = document.querySelector(".bar");

			bar.classList.remove("moving");

			if (newTop > 100) {
				setPosition([newTop + 10, pageWidth - 82]);
			} else {
				setPosition([48.5, newLeft]);
			}

			console.log(`Top: ${newTop}, Center Left: ${newLeft}`);
		}
	};

	const scrolIds = ["#start", "#content"];

	return (
		<div className='scroll-container'>
			<div className='content'>
				<div
					className='bar'
					style={{ top: position[0] + "px", left: position[1] + "px" }}></div>

				{["Start", "01", "02", "03"].map((text, index) => (
					<a
						key={index}
						className='link'
						href={scrolIds[index]}
						ref={(el) => (linksRef.current[index] = el)}
						onClick={() => handleClick(index)}>
						{text}
					</a>
				))}
			</div>
		</div>
	);
}

export default Scrollbar;
