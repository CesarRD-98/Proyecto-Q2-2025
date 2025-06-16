import { useState } from "react";
import styles from '../../styles/components/dataFilter.module.scss'

interface DateFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

export default function DateFilter({ onFilter }: DateFilterProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [status, setStatus] = useState("")

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Selecciona ambas fechas");
      return;
    }

    onFilter(startDate, endDate);
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
        {/* <div className={styles.inputGroup}>
          <label className="form-label">status: </label>
          <select name="status" id="status" className="form-control" onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">pending</option>
            <option value="in_progress">in_progress</option>
            <option value="finalized">finalized</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div> */}
        <div className="">
          <button onClick={handleFilter} className='btn btn-primary w-100'>
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
}
