import { useState } from "react";
import axios from "axios";

import Modal from "./Modal";

export default function DeleteCategoryModal(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Modal onClose={props.onClose}>
      <p style={{ marginTop: "16px", fontSize: "1.25rem" }}>
        ¿Está seguro de eliminar esta categoría?
      </p>
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
                "http://localhost:3000/api/v1/categories/" + props.category.id
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
