"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPaperclip } from "react-icons/fa";
import styles from "../../styles/components/createTicket.module.scss";
import { useGetTickets } from "@/app/providers/getTicketsProvider";
import { useTicketRefresh } from "@/app/providers/ticketRefreshProvider";
import { API_URL } from "@/app/API/api.url";
import { AreasType } from "@/app/models/areasModel";

type TicketForm = {
  title: string;
  description: string;
  area: number
};

export default function CreateTicket() {
  const { getTickets } = useGetTickets()
  const { triggerRefresh } = useTicketRefresh()
  const [color, setColor] = useState("red")
  const [bgColor, setBgColor] = useState("#FDEDDC")
  const [area, setArea] = useState<AreasType[]>([])

  useEffect(() => {
    const load = async () => {
      const {areas} = await getTickets({params: {}})
      setArea(areas || [])
    }
    load()
  }, [])

  const [form, setForm] = useState<TicketForm>({
    title: "",
    description: "",
    area: 1,
  });
  
  const [mensaje, setMensaje] = useState<string>(""); // Mensaje de confirmación o error

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    if (!form.title.trim()) return false;
    if (!form.description.trim()) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setMensaje("Por favor completa todos los campos obligatorios.");
      return;
    }

    // CORREGIDO → obtener token dinamicamente
    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("No estás autenticado. Inicia sesión.");
      return;
    }

    try {
      await axios.post(`${API_URL}/tickets`, {
        title: form.title,
        description: form.description
      }, {
        headers: { Authorization: `Bearer ${token}` },
      }
      );

      setColor("green")
      setBgColor("#E3F6E6")
      setMensaje("Ticket creado correctamente.");
      setForm({
        title: "",
        description: "",
        area: 1,
      });
      triggerRefresh()
      await getTickets({ params: {} })
    } catch (error) {
      console.error("Error al crear ticket:", error);
      setMensaje(" Error al crear el ticket.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formTicket}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="title" className="form-label">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="form-control"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="area" className="form-label">
          Seleccionar área
        </label>
        <select
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          className="form-control"
        >
          {area.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn w-100 btn-primary">
        Crear Ticket
      </button>

      {mensaje && (
        <div
          style={{
            marginTop: 12,
            color: color,
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: bgColor,
            padding: 6,
            borderRadius: 4
          }}
        >
          {mensaje}
        </div>
      )}
    </form>
  );
}
