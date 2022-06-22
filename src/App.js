import "./App.css"
import Certificate from "./Certificate";
import Form from "./form";
import { ProviderInfo } from "./context/provider";
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
