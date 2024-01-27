import { useEffect } from 'react';
import init from './pong';
function App() {
  useEffect(() => {
    const loadWasm = async () => {
      await init();
    };
    loadWasm();
  }, []);

  return <div>WebAssembly Result: {}</div>;
}

export default App;
