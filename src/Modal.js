import closeIcon from "./close.png";

export default function Modal(props) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0,0,0,0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          minWidth: "25%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            onClick={props.onClose}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <img src={closeIcon} alt="" style={{ width: "24px" }} />
          </button>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
