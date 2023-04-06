import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [sex, setSex] = useState("");
  const [piece, setPiece] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState([]);

  
  const submitForm = async () => {
    const requestedData = {
      prompt: `logo for a ${piece} destined to ${sex} with ${description}`,
      n: 1,
      size: "1024x1024",
    };

    await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,

      },
      body:JSON.stringify(requestedData)
    }).then(async(res)=>{
      const data=await res.json();
      
      if (!res.ok) throw new Error("Eroare API");
     setResult(data.data)
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="text1">
          Preview your designs <br />
          using AI.
        </h1>
        <select
          name="sex"
          id="sex"
          onChange={(e) => {
            setSex(e.target.value);
          }}
        >
          <option value="select" id="selectSex">
            select sex
          </option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="unisex">unisex</option>
        </select>
        <select
          name="piece"
          id="piece"
          onChange={(e) => {
            setPiece(e.target.value);
          }}
        >
          <option value="select" id="selectPiece">
            select piece of clothing
          </option>
          <option value="tshirt">tshirt</option>
          <option value="blouse">blouse</option>
          <option value="skirt">skirt</option>
          <option value="hat">hat</option>
          <option value="leggings">leggings</option>
          <option value="jacket">jacket</option>
        </select>
        <input
          type="text"
          id="designinput"
          name="designinput"
          placeholder="describe your desired design"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button id="submit" onClick={submitForm}>GENERATE</button>
        {result.map((img,idx)=>
           <img key={idx} src={img.url} id="imageOutput" />
        )}
      </header>
    </div>
  );
}

export default App;
