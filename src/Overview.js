import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Overview() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
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
  });

  const income = transactions
    .filter((transaction) => transaction.category.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.category.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: "32px",
      }}
    >
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: "right",
          }}
        >
          Saldo:{" "}
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
          }).format(income - expense)}
        </p>
        <br />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: "right",
          }}
        >
          Ingresos:{" "}
          <span style={{ color: "#8fda85" }}>
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(income)}
          </span>
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: "right",
          }}
        >
          Gastos:{" "}
          <span style={{ color: "red" }}>
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(expense)}
          </span>
        </p>
      </div>
      <div style={{ width: "50%" }}>
        <Bar
          data={{
            labels: ["Ingresos", "Gastos"],
            datasets: [
              {
                data: [income, expense],
                backgroundColor: ["#8fda85", "red"],
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
          }}
        />
      </div>
    </div>
  );
}
