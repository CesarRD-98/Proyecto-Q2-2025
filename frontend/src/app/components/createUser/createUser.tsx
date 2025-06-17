"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/components/createTicket.module.scss";
import { API_URL } from "@/app/API/api.url";

type UserForm = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function CreateUser() {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [mensaje, setMensaje] = useState<string>("");
  const [color, setColor] = useState("red");
  const [bgColor, setBgColor] = useState("#FDEDDC");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    if (!form.password.trim()) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setMensaje("Por favor completa todos los campos obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("No estás autenticado. Inicia sesión.");
      return;
    }

    try {
      await axios.post(`${API_URL}/users`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setColor("green");
      setBgColor("#E3F6E6");
      setMensaje("Usuario creado correctamente.");
      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMensaje("Error al crear el usuario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formTicket}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="role" className="form-label">
          Rol
        </label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className="form-control"
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
          <option value="technician">Técnico</option>
        </select>
      </div>

      <button type="submit" className="btn w-100 btn-primary">
        Crear Usuario
      </button>

      {mensaje && (
        <div
          style={{
            marginTop: 12,
            color: color,
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: bgColor,
            padding: 6,
            borderRadius: 4,
          }}
        >
          {mensaje}
        </div>
      )}
    </form>
  );
}
