'use client'
import React, { useState } from 'react'
import { FaPaperclip } from 'react-icons/fa';
import styles from '../../styles/components/createTicket.module.scss'

type TicketForm = {
    title: string;
    description: string;
    priority: "baja" | "medio" | "alta";
    area: "TI" | "RRHH" | "Mantenimiento"
};

export default function CreateTicket() {

    const [form, setForm] = useState<TicketForm>({
        title: "",
        description: "",
        priority: "medio",
        area: "TI"
    });

    const [archivo, setArchivo] = useState<File | null>(null)
    const fechaCreacion = new Date().toISOString().split('T')[0]; // Fecha actual

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = (): boolean => {

        if (!form.title.trim()) return false
        if (!form.description.trim()) return false

        return true
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        // Aquí puedes hacer el fetch a la API o manejar el envío
        console.log("Ticket creado:", form);

        // Limpiar formulario
        setForm({
            title: "",
            description: "",
            priority: "medio",
            area: "TI"
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formTicket}>
            <div style={{ marginBottom: 12 }}>
                <label htmlFor="title" className='form-label'>Título</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className='form-control'
                />
            </div>

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="description" className='form-label'>Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className='form-control'
                />
            </div>

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="priority" className='form-label'>Prioridad</label>
                <select
                    id="priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className='form-control'
                >
                    <option value="baja">Baja</option>
                    <option value="medio">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </div>

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="area" className='form-label'>Seleccionar área</label>
                <select
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className='form-control'
                >
                    <option value="TI">TI</option>
                    <option value="RRHH">RRHH</option>
                    <option value="Mantenimiento">Manteniemiento</option>
                </select>
            </div>

            <div style={{ marginBottom: 16 }}>
                <label className={styles.fileLabel}>
                    <FaPaperclip />
                    Adjuntar archivo
                    <input
                        type="file"
                        onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
                    />
                </label>
            </div>

            <button type="submit" className='btn w-100 btn-primary'>
                Crear Ticket
            </button>
        </form>
    )
}
