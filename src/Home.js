import { useState } from "react";

import Transactions from "./Transactions";
import Categories from "./Categories";
import Overview from "./Overview";

import logo from "./wameow-logo.png";

export default function Home(props) {
  const [activeTab, setActiveTab] = useState("Transacciones");
  const tabs = ["Inicio", "Transacciones", "Categorías"];

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "16px",
        backgroundColor: "white",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "16px",
          width: "13%",
          backgroundColor: "#f0f0f0",
          borderRadius: "16px 0 0 16px",
        }}
      >
        <img src={logo} alt="" style={{ width: "50%", alignSelf: "center" }} />
        {tabs.map((tab) => (
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
            }}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            {tab}
          </button>
        ))}
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("user_id");
            props.onLogOut();
          }}
        >
          Cerrar sesión
        </button>
      </div>
      <div style={{ padding: "24px", width: "100%" }}>
        {activeTab === "Transacciones" ? (
          <Transactions />
        ) : activeTab === "Categorías" ? (
          <Categories />
        ) : activeTab === "Inicio" ? (
          <Overview />
        ) : null}
      </div>
    </div>
  );
}
