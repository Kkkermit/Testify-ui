import { render } from "@testing-library/react";
import ParticleBackground from "./particle-background";

HTMLCanvasElement.prototype.getContext = jest.fn();

describe("ParticleBackground", () => {
	it("renders the canvas element", () => {
		const { container } = render(<ParticleBackground />);
		const canvas = container.querySelector("canvas");
		expect(canvas).toBeInTheDocument();
	});

	it("handles window resize event", () => {
		const addEventListenerSpy = jest.spyOn(window, "addEventListener");
		const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

		const { container, unmount } = render(<ParticleBackground />);
		const resizeEvent = new Event("resize");

		const canvas = container.querySelector("canvas") as HTMLCanvasElement;

		Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
		Object.defineProperty(window, "innerHeight", { value: 768, writable: true });

		window.dispatchEvent(resizeEvent);

		setTimeout(() => {
			expect(canvas.width).toBe(1024);
			expect(canvas.height).toBe(768);

			unmount();

			expect(addEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
			expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));

			addEventListenerSpy.mockRestore();
			removeEventListenerSpy.mockRestore();
		}, 0);
	});
});
