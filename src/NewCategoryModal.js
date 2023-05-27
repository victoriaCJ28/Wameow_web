import { useState } from "react";
import axios from "axios";

import Modal from "./Modal";

export default function NewCategoryModal(props) {
  const [selectedCategoryType, setSelectedCategoryType] = useState(
    props.category?.type || "income"
  );
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const [name, setName] = useState(props.category?.name || "");

  return (
    <Modal onClose={props.onClose}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          fontSize: "1.25rem",
          marginTop: "16px",
        }}
      >
        {[
          { text: "Ingresos", value: "income" },
          { text: "Gastos", value: "expense" },
        ].map((categoryType) => (
          <label
            key={categoryType.value}
            style={{
              color: categoryType.value === "income" ? "#8fda85" : "red",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="radio"
              name="category-type"
              value={categoryType.value}
              checked={selectedCategoryType === categoryType.value}
              onChange={(event) => {
                setSelectedCategoryType(event.target.value);
              }}
            />
            {categoryType.text}
          </label>
        ))}
      </div>
      <div style={{ marginTop: "16px" }}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          style={{
            padding: "0.5rem",
            marginTop: "0.25rem",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid black",
            backgroundColor: "white",
          }}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          disabled={isFormSubmitting || name.trim() === ""}
          style={{ width: "50%", padding: "0.5rem", fontWeight: "bold" }}
          onClick={() => {
            setIsFormSubmitting(true);

            axios[props.category ? "patch" : "post"](
              `http://localhost:3000/api/v1/categories${
                props.category ? `/${props.category.id}` : ""
              }`,
              {
                type: selectedCategoryType,
                name: name,
                user_id: parseInt(localStorage.getItem("user_id")),
              }
            )
              .then((response) => {
                props.onClose();
              })
              .catch((error) => {
                console.error(error);
                setIsFormSubmitting(false);
              });
          }}
        >
          {isFormSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}
