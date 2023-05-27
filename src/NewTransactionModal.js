import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "./Modal";

const styles = {
  textInput: {
    padding: "0.5rem",
    marginTop: "0.25rem",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
    backgroundColor: "white",
  },
  inputContainer: {
    marginTop: "16px",
  },
};

export default function NewTransactionModal(props) {
  const userId = parseInt(localStorage.getItem("user_id"));

  const [categories, setCategories] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState(
    props.transaction?.category?.type || "income"
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    props.transaction?.category?.id || null
  );
  const [amount, setAmount] = useState(props.transaction?.amount || 0);
  const [description, setDescription] = useState(
    props.transaction?.description || ""
  );

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !props.transaction) {
      setSelectedCategoryId(
        categories.filter(
          (category) =>
            category.type ===
            (props.transaction?.category?.type || selectedCategoryType)
        )[0].id
      );
    }
  }, [categories, selectedCategoryType]);

  useEffect(() => {
    setIsButtonDisabled(
      description.trim() === "" ||
        isNaN(parseFloat(amount)) ||
        parseFloat(amount) < 0.01
    );
  }, [amount, description]);

  return (
    <Modal onClose={props.onClose}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          fontSize: "1.25rem",
          ...styles.inputContainer,
        }}
      >
        {[
          { text: "Ingresos", value: "income" },
          { text: "Gastos", value: "expense" },
        ].map((categoryType) => (
          <label
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
      <div style={styles.inputContainer}>
        <label htmlFor="category">Categoría</label>
        <select
          name="category"
          id="category"
          style={styles.textInput}
          value={selectedCategoryId}
          onChange={(event) => {
            setSelectedCategoryId(event.target.value);
          }}
        >
          {categories
            .filter((category) => category.type === selectedCategoryType)
            .map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
        </select>
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="amount">Cantidad</label>
        <input
          type="number"
          id="amount"
          style={styles.textInput}
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          id="description"
          style={styles.textInput}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <div
        style={{
          ...styles.inputContainer,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          disabled={isFormSubmitting || isButtonDisabled}
          style={{ width: "50%", padding: "0.5rem", fontWeight: "bold" }}
          onClick={() => {
            setIsFormSubmitting(true);

            axios[props.transaction ? "patch" : "post"](
              `http://localhost:3000/api/v1/transactions${
                props.transaction ? `/${props.transaction.id}` : ""
              }`,
              {
                category_id: parseInt(selectedCategoryId),
                amount: parseFloat(amount),
                description: description,
                user_id: userId,
              }
            ).then(() => {});

            setTimeout(props.onClose, 1000);
          }}
        >
          {isFormSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}
