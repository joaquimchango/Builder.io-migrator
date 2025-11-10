import { useState } from "react";
import axios from "axios";

export default function ModelSelector({ apiKeys }) {
  const [models, setModels] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadModels() {
    setLoading(true);
    const res = await axios.post("/api/list-models", { sourceKey: apiKeys.sourceKey });
    setModels(res.data.models);
    setLoading(false);
  }

  async function migrate() {
    setMessage("Migrating...");
    await axios.post("/api/migrate-models", {
      sourceKey: apiKeys.sourceKey,
      targetKey: apiKeys.targetKey,
      selectedModels: selected,
    });
    setMessage("✅ Migration complete!");
  }

  return (
    <div className="selector">
      <h2>📦 Select Models to Import</h2>
      <button onClick={loadModels} disabled={loading}>
        {loading ? "Loading..." : "Load Models"}
      </button>

      {models.length > 0 && (
        <ul>
          {models.map((m) => (
            <li key={m.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected([...selected, m]);
                    } else {
                      setSelected(selected.filter((x) => x.id !== m.id));
                    }
                  }}
                />
                {m.name} ({m.kind})
              </label>
            </li>
          ))}
        </ul>
      )}

      {selected.length > 0 && (
        <button onClick={migrate}>
          Import {selected.length} Models & Entries
        </button>
      )}

      {message && <p>{message}</p>}

      <style jsx>{`
        .selector {
          width: 600px;
          margin: 2rem auto;
        }
        ul {
          list-style: none;
          padding: 0;
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 10px;
        }
        li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
