import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../auth/AuthContext';

interface MedicalRecord {
  id: string;
  description: string;
  doctor: { id: string; email: string; role: string }; // ajusta según lo que trae tu backend
  createdAt: string;
}

const PatientMedicalHistory = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/medical-history/${user.id}`);
        setRecords(res.data);
      } catch (err: any) {
        setError('No se pudo obtener el historial médico.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mi Historial Médico</h2>
      {records.length === 0 ? (
        <p>No tienes registros médicos.</p>
      ) : (
        <ul>
          {records.map((rec) => (
            <li key={rec.id}>
              <strong>Fecha:</strong> {new Date(rec.createdAt).toLocaleString()}<br />
              <strong>Doctor:</strong> {rec.doctor?.email || '---'}<br />
              <strong>Descripción:</strong> {rec.description}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientMedicalHistory;
