import "./Toast.css";

export default function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <span className="toast-message">{message}</span>
    </div>
  );
}