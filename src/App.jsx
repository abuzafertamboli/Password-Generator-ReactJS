import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-2xl text-center text-[#fff] font-semibold mb-2'>Password Generator</h1>
        <div className="flex shadow rounded-md overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-2.5 text-[#000]" placeholder="Password" readOnly ref={passwordRef} />
          <button className="outline-none px-3 py-0.5 shrink-0 transition ease-in-out delay-15 text-[#fff] bg-orange-500 hover:bg-orange-600" onClick={copyPasswordToClipboard}>COPY</button>
        </div>
        <div className="flex text-sm gap-x-5">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={35} value={length} className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numAllowed} id="numberInput" className="cursor-pointer" onChange={() => { setNumAllowed((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id="characterInput" className="cursor-pointer" onChange={() => { setCharAllowed((prev) => !prev) }} />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
