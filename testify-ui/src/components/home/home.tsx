import React, { useRef } from "react";
import Sidebar from "./sidebar/sidebar";
import logo from "../../assets/testify.png";

const Home: React.FC = () => {
	const imgRef = useRef<HTMLImageElement>(null);

	const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		if (imgRef.current) {
			const rect = imgRef.current.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const xc = rect.width / 2;
			const yc = rect.height / 2;
			const dx = x - xc;
			const dy = y - yc;
			const skewFactor = 3; // Increase this value to increase the skew effect
			const skewX = (dx / xc) * skewFactor;
			const skewY = (dy / yc) * skewFactor;
			imgRef.current.style.transform = `skew(${skewX}deg, ${skewY}deg)`;
			imgRef.current.style.boxShadow = `${skewX}px ${skewY}px 10px rgba(0, 0, 0, 0.5)`;
		}
	};

	const handleMouseLeave = () => {
		if (imgRef.current) {
			imgRef.current.style.transform = "";
			imgRef.current.style.boxShadow = "";
		}
	};

	return (
		<div className="bg-slate-700">
			<div data-testid="sidebar-component">
				<Sidebar />
			</div>
			<div className="flex flex-col items-center justify-center min-h-screen text-2xl">
				<img ref={imgRef} src={logo} alt="logo" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
			</div>
		</div>
	);
};

export default Home;
