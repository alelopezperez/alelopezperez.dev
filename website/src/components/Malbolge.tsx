import { useEffect, useRef, useState } from 'react';
import init, * as wasm from '../../public/malbolge/wasm.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

async function start(refi: React.RefObject<HTMLParagraphElement>, input: string) {
	await init();
	let interpreter = new wasm.MalbolgeVM(input);

	console.log('asd');
	if (refi == null || refi.current == null) {
		return;
	}

	while (true) {
		let stat = interpreter.exec();
		if (stat[0] == wasm.JsExecState.Finished) {
			console.log('FINITO');
			break;
		} else if (stat[0] == wasm.JsExecState.Output) {
			let big = stat[1];
			console.log(stat[1]);
			console.log(String.fromCharCode(Number(stat[1])));
			refi.current.textContent += String.fromCharCode(Number(stat[1]));
		}
	}
}
export default function Cli() {
	const refi = useRef<HTMLParagraphElement | null>(null);
	useEffect(() => {}, []);
	const [input, setInput] = useState('');
	const [history, setHistory] = useState<{ command: string; output: string }[]>([
		{
			command: '',
			output:
				'Python 3.9.0 (default, Oct 8 2020, 12:12:24)\nType "help", "copyright", "credits" or "license" for more information.'
		}
	]);
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		if (refi == null || refi.current == null) {
			return;
		}

		start(refi, input.replace(/\s+/g, ''));
		setInput('');
	};
	return (
		<div className="mx-auto w-full max-w-2xl rounded-lg bg-black p-4 shadow-lg">
			<div className="mb-4 h-96 overflow-auto bg-black p-2 font-mono text-sm text-green-400">
				<p ref={refi}></p>
			</div>
			<div className="flex gap-2">
				<Input
					type="text"
					value={input}
					onChange={handleInputChange}
					className="flex-grow border-gray-700 bg-gray-800 text-white"
					placeholder="Enter a Python command..."
				/>
				<Button
					type="submit"
					onClick={handleSubmit}
					className="bg-green-600 text-white hover:bg-green-700"
				>
					Run
				</Button>
			</div>
		</div>
	);
}
