import { useState } from "react";
import { generateAI } from "../services/aiApi";

export default function AIForm() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("explain");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponse("");

    try {
      const result = await generateAI(prompt, mode);
      setResponse(result);
    } catch {
      setResponse("Error generating response.");
    }

    setLoading(false);
  };

  const modes = [
    { value: "explain", label: "Explain Concept", icon: "📚" },
    { value: "mcq", label: "Generate MCQs", icon: "❓" },
    { value: "summarize", label: "Summarize", icon: "📝" },
    { value: "improve", label: "Improve Writing", icon: "✨" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.iconBox}>
            <span style={styles.mainIcon}>🤖</span>
          </div>
          <h1 style={styles.title}>AI Student Assistant</h1>
          <p style={styles.subtitle}>Your intelligent learning companion</p>
        </div>

        <div style={styles.card}>
          <div style={styles.section}>
            <label style={styles.label}>Choose Mode</label>
            <div style={styles.modeGrid}>
              {modes.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  style={{
                    ...styles.modeButton,
                    ...(mode === m.value ? styles.modeButtonActive : {})
                  }}
                >
                  <div style={styles.modeIcon}>{m.icon}</div>
                  <div style={styles.modeLabel}>{m.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.label}>Your Input</label>
            <textarea
              rows="6"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type or paste your text here..."
              style={styles.textarea}
            />
            <div style={styles.charCount}>{prompt.length} characters</div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            style={{
              ...styles.submitButton,
              ...(loading || !prompt.trim() ? styles.submitButtonDisabled : {})
            }}
          >
            {loading ? (
              <span style={styles.loadingText}>
                <span style={styles.spinner}>⟳</span> Generating...
              </span>
            ) : (
              "Generate Response"
            )}
          </button>
          {response && (
            <div style={styles.responseBox}>
              <div style={styles.responseHeader}>
                <span style={styles.responseIcon}>✨</span>
                <h3 style={styles.responseTitle}>AI Response</h3>
              </div>
              <div style={styles.responseText}>{response}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width:"1040px",
    background: "linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fae8ff 100%)",
    padding: "40px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  wrapper: {
    maxWidth: "900px",
    margin: "0 auto"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  iconBox: {
    display: "inline-block",
    padding: "20px",
    background: "linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
  },
  mainIcon: {
    fontSize: "50px"
  },
  title: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 10px 0"
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    margin: "0"
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "30px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)"
  },
  section: {
    marginBottom: "30px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px"
  },
  modeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px"
  },
  modeButton: {
    padding: "20px",
    border: "2px solid #e5e7eb",
    borderRadius: "15px",
    background: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151"
  },
  modeButtonActive: {
    borderColor: "#3b82f6",
    background: "#eff6ff",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
    transform: "scale(1.05)"
  },
  modeIcon: {
    fontSize: "28px",
    marginBottom: "8px"
  },
  modeLabel: {
    fontSize: "13px"
  },
  textarea: {
    width: "100%",
    padding: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "15px",
    fontSize: "16px",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },
  charCount: {
    textAlign: "right",
    fontSize: "14px",
    color: "#9ca3af",
    marginTop: "8px"
  },
  submitButton: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "15px",
    background: "linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
  },
  submitButtonDisabled: {
    background: "#d1d5db",
    cursor: "not-allowed",
    boxShadow: "none"
  },
  loadingText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
    fontSize: "20px"
  },
  responseBox: {
    marginTop: "30px",
    padding: "25px",
    background: "linear-gradient(135deg, #f9fafb 0%, #eff6ff 100%)",
    borderRadius: "15px",
    border: "2px solid #dbeafe",
    animation: "fadeIn 0.4s ease-out"
  },
  responseHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  },
  responseIcon: {
    fontSize: "24px"
  },
  responseTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0"
  },
  responseText: {
    fontSize: "16px",
    color: "#374151",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap"
  },
  
};