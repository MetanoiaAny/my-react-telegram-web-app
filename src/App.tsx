import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SDKProvider } from '@tma.js/sdk-react';
import { useInitData, useLaunchParams, } from '@tma.js/sdk-react';

function App() {
  const [count, setCount] = useState(0)
  const initData = useInitData();
  const initDataRaw = useLaunchParams()
  useEffect(()=>{
    console.log(initData);
    console.log(initDataRaw);
    
  },[])
  return (
    <>
    <SDKProvider acceptCustomStyles debug>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </SDKProvider>
    </>
  )
}

export default App
