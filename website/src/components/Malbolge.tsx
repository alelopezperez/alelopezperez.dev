import { useEffect, useRef, useState } from 'react';
import init, * as wasm from '../../public/malbolge/wasm.js';
import { Button } from './ui/button.js';
import { Input } from './ui/input.js';

export default function Cli() {
	const [interpreter, setInterpreter] = useState<wasm.MalbolgeVM | null>(null);
	const [input, setInput] = useState('');
	const [myOut, setMyOut] = useState('');
	const [history, setHistory] = useState<{ command: string; output: string }[]>([
		{
			command: '',
			output:
				'Python 3.9.0 (default, Oct 8 2020, 12:12:24)\nType "help", "copyright", "credits" or "license" for more information.'
		}
	]);
	const terminalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		async function start() {
			await init();
			let interp = new wasm.MalbolgeVM(
				'(=<`#9]~6ZY327Uv4-QsqpMn&+Ij"\'E%e{Ab~w=_:]Kw%o44Uqp0/Q?xNvL:`H%c#DD2^WV>gY;dts76qKJImZkj'
			);

			setInterpreter(interp);
		}
		start();
		if (interpreter == null) {
			return;
		}

		while (true) {
			let status = interpreter.exec();

			if (status[0] == wasm.JsExecState.Finished) {
				break;
			} else if (status[0] == wasm.JsExecState.Output) {
				setMyOut(String.fromCharCode(Number(status[1])));
			}
		}
	}, [interpreter]);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim() === '') return;

		const newCommand = { command: input, output: '' };

		// Simulate Python interpreter behavior
		switch (input.toLowerCase()) {
			case 'help':
				newCommand.output =
					'Welcome to the simulated Python interpreter!\nAvailable commands: help, print("hello world"), 2 + 2';
				break;
			case 'print("hello world")':
				newCommand.output = 'hello world';
				break;
			case '2 + 2':
				newCommand.output = '4';
				break;
			default:
				newCommand.output =
					'Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name \'' +
					input +
					"' is not defined";
		}

		setHistory([...history, newCommand]);
		setInput('');
	};

	return (
		<div className="mx-auto w-full max-w-2xl rounded-lg bg-black p-4 shadow-lg">
			<div
				ref={terminalRef}
				className="mb-4 h-96 overflow-auto bg-black p-2 font-mono text-sm text-green-400"
			>
				{history.map((item, index) => (
					<div key={index}>
						{item.command && (
							<div className="text-yellow-400">
								{'>>'} {item.command}
							</div>
						)}
						<div className="whitespace-pre-wrap">{item.output}</div>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					type="text"
					value={input}
					onChange={handleInputChange}
					className="flex-grow border-gray-700 bg-gray-800 text-white"
					placeholder="Enter a Python command..."
				/>
				<Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
					Run
				</Button>
			</form>
			<h1>asdasd {myOut}</h1>
		</div>
	);
}
