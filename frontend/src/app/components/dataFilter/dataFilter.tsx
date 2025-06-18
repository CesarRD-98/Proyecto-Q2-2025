import { useEffect, useState } from "react";
import styles from '../../styles/components/dataFilter.module.scss'
import { useGetTickets } from "@/app/providers/getTicketsProvider";

interface DateFilterProps {
  onFilter: (startDate: string, endDate: string, areaId?: string) => void;
}

export default function DateFilter({ onFilter }: DateFilterProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [areaSelected, setAreaSelected] = useState("")
  const { areas } = useGetTickets()

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Selecciona ambas fechas");
      return;
    }
    const areaId = areaSelected !== "" ? areaSelected : undefined
    onFilter(startDate, endDate, areaId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filtrar Tickets por Fecha</h2>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label className="form-label">Desde: </label>
          <input
            className="form-control"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className="form-label">Hasta: </label>
          <input
            className="form-control"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className="form-label">Área: </label>
          <select name="status" id="status" className="form-control" onChange={(e) => setAreaSelected(e.target.value)}>
            <option value="">-- Todas las áreas --</option>
            {areas.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div className="">
          <button onClick={handleFilter} className='btn btn-primary w-100'>
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
}
