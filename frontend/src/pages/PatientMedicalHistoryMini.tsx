import { useState } from 'react';
import axios from '../api/axios';

interface MedicalRecord {
  id: string;
  description: string;
  createdAt: string;
  doctor: { email: string; name?: string };
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
    <div style={{ margin: '10px 0' }}>
      <button
        onClick={handleToggle}
        style={{
          background: show ? '#1769aa' : '#2980b9',
          color: '#fff',
          padding: '6px 14px',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginBottom: 4,
          fontWeight: 600
        }}>
        {show ? 'Ocultar historial' : 'Ver historial médico'}
      </button>
      {show && (
        <div
          style={{
            padding: 10,
            border: '1px solid #d2e5fa',
            marginTop: 6,
            background: '#f4f9fd',
            borderRadius: 8,
            boxShadow: '0 1px 6px #eaf2fd',
            maxWidth: 450
          }}>
          {loading && <div style={{ color: '#2980b9' }}>Cargando...</div>}
          {!loading && records.length === 0 && (
            <div style={{ color: '#666', fontStyle: 'italic' }}>Sin registros médicos previos.</div>
          )}
          {!loading && records.length > 0 && (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {records.map((rec) => (
                <li
                  key={rec.id}
                  style={{
                    borderBottom: '1px solid #e2e6ef',
                    paddingBottom: 8,
                    marginBottom: 7,
                    fontSize: 15
                  }}>
                  <span style={{ color: '#1565c0', fontWeight: 600 }}>
                    {new Date(rec.createdAt).toLocaleString()}
                  </span>
                  <br />
                  <b>Por:</b> {rec.doctor.name || rec.doctor.email}
                  <br />
                  <b>Descripción:</b>{' '}
                  <span style={{ color: '#555' }}>{rec.description}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
