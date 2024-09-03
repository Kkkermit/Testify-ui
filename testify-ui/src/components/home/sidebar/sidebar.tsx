import React, { useState, useEffect, useRef } from "react";
import "../../../styles/index.css";
import logo from "../../../assets/testify.png";

const Sidebar: React.FC = () => {
	const text = "Testify".split("").map((char, index) => (
		<span key={index} style={{ animationDelay: `${index * 0.2}s` }} className="wave">
			{char}
		</span>
	));

	const [particles, setParticles] = useState<JSX.Element[]>([]);
	const textRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			if (textRef.current) {
				const rect = textRef.current.getBoundingClientRect();
				const newParticle = (
					<div
						key={Date.now()}
						className={`particle particle-${Math.floor(Math.random() * 4)}`}
						style={{
							left: `${Math.random() * rect.width + rect.left}px`,
							top: `${Math.random() * rect.height + rect.top}px`,
						}}
					/>
				);
				setParticles((prevParticles) => [...prevParticles, newParticle]);
				if (particles.length > 20) {
					setParticles((prevParticles) => prevParticles.slice(1));
				}
			}
		}, 100);

		return () => clearInterval(interval);
	}, [particles]);

	return (
		<div className="hidden md:block fixed left-4 top-4 bottom-4">
			<div className="bg-black bg-opacity-50 backdrop-blur-md w-400px h-full rounded-lg relative">
				<header className="text-center animate-bounce">
					<div className="flex items-center pt-10 ml-14">
						<img src={logo} alt="logo" className="w-16 h-16 mr-4 rounded-full" />
						<h1 ref={textRef} className="text-white text-5xl animate-pulse text-shadow font-bold">
							{text}
						</h1>
					</div>
				</header>
				{particles}
			</div>
		</div>
	);
};

export default Sidebar;
