import { useState } from "react";
import ApiKeyForm from "../components/ApiKeyForm";
import ModelSelector from "../components/ModelSelector";

export default function Home() {
  const [apiKeys, setApiKeys] = useState(null);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🧩 Builder.io Space Migrator</h1>
      {!apiKeys ? (
        <ApiKeyForm onSubmit={setApiKeys} />
      ) : (
        <ModelSelector apiKeys={apiKeys} />
      )}
    </div>
  );
}
