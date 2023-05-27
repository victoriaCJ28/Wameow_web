import { useEffect, useState } from "react";
import axios from "axios";

import plusIcon from "./add.png";
import editIcon from "./editing.png";
import trashIcon from "./trash.png";

import NewCategoryModal from "./NewCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  useEffect(() => {
    if (!showNewCategoryModal || !showDeleteCategoryModal) {
      axios
        .get(
          `http://localhost:3000/api/v1/users/${localStorage.getItem(
            "user_id"
          )}/categories`
        )
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [showNewCategoryModal, showDeleteCategoryModal]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>Categorías</span>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowNewCategoryModal(true);
          }}
        >
          <img src={plusIcon} alt="" style={{ width: "24px" }} />
        </button>
      </div>
      <div style={{ display: "flex", gap: "64px" }}>
        {[
          { text: "Ingresos", value: "income" },
          { text: "Gastos", value: "expense" },
        ].map((categoryType) => (
          <div style={{ width: "25%" }} key={categoryType.value}>
            <p
              style={{
                fontSize: "1.25rem",
                color: categoryType.value === "income" ? "#8fda85" : "red",
              }}
            >
              {categoryType.text}
            </p>
            {categories
              .filter((category) => category.type === categoryType.value)
              .map((category) => (
                <div
                  style={{
                    padding: "8px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(0,0,0,0.25)",
                  }}
                >
                  <span>{category.name}</span>
                  {category.can_be_deleted ? (
                    <div>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowNewCategoryModal(true);
                        }}
                      >
                        <img src={editIcon} alt="" style={{ width: "16px" }} />
                      </button>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowDeleteCategoryModal(true);
                        }}
                      >
                        <img src={trashIcon} alt="" style={{ width: "16px" }} />
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        ))}
      </div>
      {showNewCategoryModal ? (
        <NewCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowNewCategoryModal(false);
            setSelectedCategory(null);
          }}
        />
      ) : null}
      {showDeleteCategoryModal ? (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowDeleteCategoryModal(false);
            setSelectedCategory(null);
          }}
        />
      ) : null}
    </>
  );
}
