import { useState } from "react";
import formurlencoded from 'form-urlencoded';

function App() {
  const [sudo, setSudo] = useState([
    [9, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])

  const handelChange = (rowIndex, colIndex, value) => {
    const newSudo = [...sudo]
    newSudo[rowIndex][colIndex] = value
    setSudo(newSudo)
  }

  const handelSolve = async () => {
    const data1 = {board:[[0,0,0,0,0,0,8,0,0],[0,0,4,0,0,8,0,0,9],[0,7,0,0,0,0,0,0,5],[0,1,0,0,7,5,0,0,8],[0,5,6,0,9,1,3,0,0],[7,8,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,0,0,9,3,0,0,1,0],[0,0,5,7,0,0,4,0,3]]}

    let response = await fetch("https://sugoku.herokuapp.com/solve", {
      method: 'POST',
      body: (data1),
      headers: 
      { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    const data = await response.json();
    console.log(data.solution)
    setSudo(data.solution)

  }

  const handelGet = async () => {
    let response = await fetch("https://sugoku.herokuapp.com/board?difficulty=easy", {
    })
    const data = await response.json();
    console.log(data.board)
    setSudo(data.board)
  }

  return (
    <div className=" bg-slate-400">
      <div className="App flex justify-aroun">
        <div className="grid grid-cols-9 p-4">
          {sudo.map((s, rowIndex) => (
            <div key={rowIndex}>
              {s.map((x, colIndex) => (
                <h1 key={colIndex} className="border-2 border-black">
                  <input value={x} className="w-[20px] p-1" onChange={(e) => handelChange(rowIndex, colIndex, parseInt(e.target.value) || 0)}></input>
                </h1>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="bg-pink-400" onClick={() => handelSolve()}>solve</button>
      <button className="bg-pink-400" onClick={() => handelGet()}>Get</button>


    </div>
  );
}

export default App;
