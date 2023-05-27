import { useEffect, useState } from "react";
import axios from "axios";

import logo from "./wameow-logo.png";

const styles = {
  textInput: {
    padding: "0.5rem",
    marginTop: "0.25rem",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
  },
  inputContainer: {
    marginTop: "16px",
  },
};

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsButtonDisabled(
      username.trim() === "" ||
        password.trim() === "" ||
        (isCreatingUser ? password !== passwordConfirmation : false)
    );
  }, [username, password, passwordConfirmation]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "white",
      }}
    >
      <img src={logo} alt="" style={{ width: "33%", alignSelf: "center" }} />
      <div style={styles.inputContainer}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          disabled={isFormSubmitting}
          type="text"
          id="username"
          style={styles.textInput}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="password">Contraseña</label>
        <input
          disabled={isFormSubmitting}
          type="password"
          style={styles.textInput}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      {isCreatingUser ? (
        <div style={styles.inputContainer}>
          <label htmlFor="password-confirmation">Confirmar contraseña</label>
          <input
            disabled={isFormSubmitting}
            type="password"
            style={styles.textInput}
            value={passwordConfirmation}
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
            }}
          />
        </div>
      ) : null}
      <small style={{ color: "red", textAlign: "center" }}>
        {isCreatingUser && password !== passwordConfirmation
          ? "Las contraseñas no coinciden"
          : ""}
      </small>
      <small style={{ color: "red", textAlign: "center" }}>{error}</small>

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

            if (isCreatingUser) {
              axios
                .post("http://localhost:3000/api/v1/users", {
                  username: username,
                  password: password,
                })
                .then((response) => {
                  localStorage.setItem("user_id", response.data.id);
                  props.onLogin();
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              axios
                .post("http://localhost:3000/api/v1/users/login", {
                  username: username,
                  password: password,
                })
                .then((response) => {
                  if (response.data) {
                    localStorage.setItem("user_id", response.data.id);
                    props.onLogin();
                  } else {
                    setError("Credenciales incorrectas");
                  }
                })
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => {
                  setIsFormSubmitting(false);
                });
            }
          }}
        >
          {isFormSubmitting
            ? isCreatingUser
              ? "Creando usuario..."
              : "Iniciando sesión..."
            : isCreatingUser
            ? "Crear usuario"
            : "Iniciar sesión"}
        </button>
      </div>
      <button
        style={{
          marginTop: "16px",
          border: " none",
          backgroundColor: "transparent",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsCreatingUser(!isCreatingUser);
        }}
      >
        o {isCreatingUser ? "Inicie sesión" : "Cree un usuario"}
      </button>
    </div>
  );
}
