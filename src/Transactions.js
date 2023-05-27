import { useEffect, useState } from "react";
import axios from "axios";

import plusIcon from "./add.png";
import editIcon from "./editing.png";
import trashIcon from "./trash.png";

import NewTransactionModal from "./NewTransactionModal";
import DeleteTransactionModal from "./DeleteTransactionModal";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showDeleteTransctionModal, setShowDeleteTransactionModal] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();

  useEffect(() => {
    if (!showNewTransactionModal || !showDeleteTransctionModal) {
      axios
        .get(
          `http://localhost:3000/api/v1/users/${localStorage.getItem(
            "user_id"
          )}/transactions`
        )
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [showNewTransactionModal, showDeleteTransctionModal]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          alignItems: "center",
        }}
      >
        <div>
          <p>Saldo</p>
          <p style={{ fontSize: "1.25rem" }}>
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(
              transactions
                .filter((transaction) => transaction.category.type === "income")
                .reduce((sum, transaction) => sum + transaction.amount, 0) -
                transactions
                  .filter(
                    (transaction) => transaction.category.type === "expense"
                  )
                  .reduce((sum, transaction) => sum + transaction.amount, 0)
            )}
          </p>
        </div>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowNewTransactionModal(true);
          }}
        >
          <img src={plusIcon} alt="" style={{ width: "24px" }} />
        </button>
      </div>
      {transactions.map((transaction) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            alignItems: "center",
            borderBottom: "1px solid rgba(0,0,0,0.25)",
          }}
        >
          <div>
            <p>{transaction.category.name}</p>
            <p style={{ fontSize: ".75rem", color: "gray" }}>
              {transaction.description}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: "1.25rem",
                color:
                  transaction.category.type === "expense" ? "red" : "#8fda85",
                marginRight: "16px",
              }}
            >
              {new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(transaction.amount)}
            </span>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                marginRight: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedTransaction(transaction);
                setShowNewTransactionModal(true);
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
                setSelectedTransaction(transaction);
                setShowDeleteTransactionModal(true);
              }}
            >
              <img src={trashIcon} alt="" style={{ width: "16px" }} />
            </button>
          </div>
        </div>
      ))}
      {showNewTransactionModal ? (
        <NewTransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setShowNewTransactionModal(false);
            setSelectedTransaction(null);
          }}
        />
      ) : null}
      {showDeleteTransctionModal ? (
        <DeleteTransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setShowDeleteTransactionModal(false);
            setSelectedTransaction(null);
          }}
        />
      ) : null}
    </>
  );
}
