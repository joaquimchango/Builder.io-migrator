import { useState } from "react";

export default function ApiKeyForm({ onSubmit }) {
  const [sourceKey, setSourceKey] = useState("");
  const [targetKey, setTargetKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ sourceKey, targetKey });
  };

  return (
    <form onSubmit={handleSubmit} className="api-form">
      <h2>🔑 API Key Configuration</h2>
      <input
        type="password"
        placeholder="Source Space Private API Key"
        value={sourceKey}
        onChange={(e) => setSourceKey(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Target Space Private API Key"
        value={targetKey}
        onChange={(e) => setTargetKey(e.target.value)}
        required
      />
      <button type="submit">Continue</button>
      <style jsx>{`
        .api-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 400px;
          margin: 2rem auto;
        }
        input, button {
          padding: 10px;
          font-size: 1rem;
        }
      `}</style>
    </form>
  );
}
