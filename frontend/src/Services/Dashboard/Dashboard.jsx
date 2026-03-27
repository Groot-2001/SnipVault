import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./dashboard.css";
import { createPaste, deletePaste, getMyPastes } from "../../Services/api";

function Dashboard({ isAuthenticated }) {
  const [text, setText] = useState("");
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPastes = async () => {
    try {
      const data = await getMyPastes();
      setPastes(data.pastes || []);
    } catch (fetchError) {
      setError(fetchError.message);
    }
  };

  useEffect(() => {
    loadPastes();
  }, []);

  const onCreatePaste = async () => {
    if (!text.trim()) {
      setError("Paste text is required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await createPaste({ text });
      setText("");
      await loadPastes();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setLoading(false);
    }
  };

  const onDeletePaste = async (id) => {
    setError("");
    try {
      await deletePaste(id);
      await loadPastes();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <div className="dashboard_container">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="editor_container">
        <textarea
          className="main_editor"
          name="content"
          id="content"
          placeholder="Write your paste here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </div>
      {error && <p className="feedback error">{error}</p>}
      <div className="btn-controls">
        <button type="button" className="paste-btn" onClick={onCreatePaste} disabled={loading}>
          {loading ? "Saving..." : "Create Paste"}
        </button>
      </div>

      <section className="paste_list">
        <h3>Your Pastes</h3>
        {pastes.length === 0 ? (
          <p>No pastes yet.</p>
        ) : (
          pastes.map((paste) => (
            <article key={paste._id} className="paste_card">
              <pre>{paste.text}</pre>
              <div className="paste_card_footer">
                <small>{new Date(paste.createdAt).toLocaleString()}</small>
                <button type="button" onClick={() => onDeletePaste(paste._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default Dashboard;
