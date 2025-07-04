import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface MedicalRecord {
  id: string;
  description: string;
  createdAt: string;
  doctor: { email: string };
}

export default function PatientMedicalHistoryMini({ patientId }: { patientId: string }) {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/medical-history/${patientId}`);
      setRecords(res.data);
    } catch (err) {
      setRecords([]);
    }
    setLoading(false);
  };

  const handleToggle = () => {
    if (!show) fetchHistory();
    setShow(!show);
  };

  return (
    <div>
      <button onClick={handleToggle} style={{ margin: '6px 0' }}>
        {show ? 'Ocultar historial' : 'Ver historial médico'}
      </button>
      {show && (
        <div style={{ padding: 8, border: '1px solid #ccc', marginTop: 4, background: '#fafafa' }}>
          {loading && <div>Cargando...</div>}
          {!loading && records.length === 0 && <div>Sin registros médicos previos.</div>}
          {!loading && records.length > 0 && (
            <ul>
              {records.map((rec) => (
                <li key={rec.id}>
                  <b>Fecha:</b> {new Date(rec.createdAt).toLocaleString()}<br />
                  <b>Por:</b> {rec.doctor.email}<br />
                  <b>Descripción:</b> {rec.description}
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
