import React from "react";
import "./App.css";
import Certificate from "./Certificate";
import Form from "./Form";
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
