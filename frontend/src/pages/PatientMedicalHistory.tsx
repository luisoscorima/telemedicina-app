import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../auth/AuthContext';

interface MedicalRecord {
  id: string;
  description: string;
  doctor: { id: string; email: string; name?: string; role: string };
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

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando historial...</p>;
  if (error) return <p style={{ color: '#b71c1c', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{
      maxWidth: 700,
      margin: '30px auto',
      background: '#f9fafc',
      borderRadius: 12,
      padding: 32,
      boxShadow: '0 2px 16px #e0e9f6'
    }}>
      <h2 style={{
        color: '#1565c0',
        marginBottom: 24,
        fontWeight: 700,
        textAlign: 'center',
        letterSpacing: 1
      }}>
        🩺 Mi Historial Médico
      </h2>
      {records.length === 0 ? (
        <p style={{
          color: '#888',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>No tienes registros médicos.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {records.map((rec) => (
            <div key={rec.id} style={{
              background: '#fff',
              border: '1px solid #dde6f3',
              borderRadius: 10,
              padding: 18,
              boxShadow: '0 1px 8px #e0e9f6',
              transition: 'box-shadow 0.2s',
              marginBottom: 6
            }}>
              <div style={{ fontSize: 14, color: '#0b406e', fontWeight: 600 }}>
                Fecha: <span style={{ color: '#374151', fontWeight: 400 }}>{new Date(rec.createdAt).toLocaleString()}</span>
              </div>
              <div style={{ fontSize: 14, color: '#444', marginTop: 2 }}>
                <b>Doctor:</b> {rec.doctor?.name || rec.doctor?.email || '---'}
              </div>
              <div style={{ marginTop: 7, fontSize: 15, color: '#222' }}>
                <b>Descripción:</b> <span style={{ fontWeight: 400 }}>{rec.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientMedicalHistory;
