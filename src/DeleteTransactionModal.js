import { useState } from "react";
import axios from "axios";

import Modal from "./Modal";

export default function DeleteTransactionModal(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Modal onClose={props.onClose}>
      <p style={{ marginTop: "16px", fontSize: "1.25rem" }}>
        ¿Está seguro de eliminar esta transacción?
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 0",
          alignItems: "center",
        }}
      >
        <div>
          <p>{props.transaction.category.name}</p>
          <p style={{ fontSize: ".75rem", color: "gray" }}>
            {props.transaction.description}
          </p>
        </div>
        <span
          style={{
            fontSize: "1.25rem",
            color:
              props.transaction.category.type === "expense" ? "red" : "#8fda85",
          }}
        >
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
          }).format(props.transaction.amount)}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          disabled={isDeleting}
          style={{
            width: "50%",
            padding: "0.5rem",
            fontWeight: "bold",
            marginTop: "16px",
          }}
          onClick={() => {
            setIsDeleting(true);

            axios
              .delete(
                `http://localhost:3000/api/v1/transactions/${props.transaction.id}`
              )
              .then(() => {
                props.onClose();
              })
              .catch((error) => {
                console.error(error);
                setIsDeleting(false);
              });
          }}
        >
          {isDeleting ? "Eliminando..." : "Sí, eliminar"}
        </button>
      </div>
    </Modal>
  );
}
