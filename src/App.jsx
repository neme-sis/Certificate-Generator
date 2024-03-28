import React from "react";
import "./App.css";
import Certificate from "./components/Certificate";
import Form from "./components/Form";
import { ProviderInfo } from "./context/Provider";
function App() {
  return (
    <div className="App">
      <ProviderInfo>
        <Form />
        <Certificate />
      </ProviderInfo>
    </div>
  );
}

export default App;
