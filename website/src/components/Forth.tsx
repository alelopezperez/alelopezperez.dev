import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import init, * as wasm from '../../public/forth/wasm.js';
import { ForthInterpreter } from 'public/forth/wasm';

export default function CliForth() {
	const refi = useRef<HTMLParagraphElement | null>(null);
	const [interpreter, setInterpreter] = useState<ForthInterpreter>();
	useEffect(() => {
		const start = async () => {
			console.log('AAAAAA');
			await init();
			console.log('asd');
			setInterpreter(new wasm.ForthInterpreter());
		};
		start();
	}, []);
	const [input, setInput] = useState('');
	const [history, setHistory] = useState<{ command: string; output: string }[]>([
		{
			command: '',
			output: ''
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
		let out = interpreter?.exec(input);
		if (out == undefined) {
			return;
		}
		if (refi == null || refi.current == null) {
			return;
		}

		refi.current.textContent = out;

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
					placeholder="Enter a Forth command..."
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
