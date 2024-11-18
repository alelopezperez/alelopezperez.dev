import { useRef, useEffect, useState } from 'react';
import init, * as wasm from '../../public/wasm.js';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [file, setFile] = useState<null | Uint8Array>(null);
	const [chip8, setChip8] = useState<wasm.Emulator | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas == null) {
			return;
		}
		const context = canvas.getContext('2d');
		if (context == null) {
			return;
		}
		//Our first draw
		context.fillStyle = '#000000';
		context.fillRect(0, 0, 64 * 16, 32 * 16);
	}, []);

	async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		await init();
		let chip8 = new wasm.Emulator();
		const reader = new FileReader();
		reader.onload = async (e) => {
			const bf = reader.result;
			if (bf == null) {
				return;
			}
			if (typeof bf == 'string') {
				return;
			}
			const rom = new Uint8Array(bf);

			chip8.load(rom);

			const canvas = canvasRef.current;
			if (canvas == null) {
				return;
			}
			document.addEventListener('keydown', function (evt) {
				chip8.keypress(evt, true);
			});
			document.addEventListener('keyup', function (evt) {
				chip8.keypress(evt, false);
			});
			game_loop(chip8, canvas);
		};
		if (
			event == null ||
			event.target == null ||
			event.target.files == null ||
			event.target.files[0] == null
		) {
			return;
		}
		reader.readAsArrayBuffer(event.target.files[0]);
	}

	function game_loop(chip8: wasm.Emulator, canvas: HTMLCanvasElement) {
		const context = canvas.getContext('2d');

		if (context == null) {
			return;
		}

		for (let i = 0; i < 1; i++) {
			chip8.exec();
		}

		chip8.tick_delay_timer();

		if (chip8.can_draw()) {
			console.log('draw');
			const buff = chip8.get_buffer();
			chip8.un_draw();
			context.fillStyle = '#000000';
			context.fillRect(0, 0, 64 * 16, 32 * 16);

			for (let i = 0; i < 32 * 64; i++) {
				if (buff[i] != 120) {
					let x = i % 64;
					let y = Math.floor(i / 64);

					context.fillStyle = 'green';
					context.fillRect(x * 16, y * 16, 16, 1 * 16);
				}
			}
		}

		window.requestAnimationFrame(() => {
			game_loop(chip8, canvas);
		});
	}

	return (
		<div className="flex flex-col">
			<canvas height={32 * 20} width={64 * 20} id="canvas" ref={canvasRef} />
			<div className="App">
				<form>
					<input type="file" onChange={handleChange} />
					<button type="submit">Upload</button>
				</form>
			</div>
		</div>
	);
};

export default Canvas;
