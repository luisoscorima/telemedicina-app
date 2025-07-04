import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateAppointmentPage() {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState<{ id: string; name?: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/users')
      .then(res => {
        const onlyDoctors = res.data.filter((user: any) => user.role === 'doctor');
        setDoctors(onlyDoctors);
      })
      .catch(() => alert('Error al cargar doctores'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!reason.trim() || !date || !doctorId) {
      alert('Completa todos los campos');
      return;
    }
    try {
      await axios.post('/appointments', { reason, date, doctorId });
      alert('Cita creada exitosamente.\nSe enviaría un correo de notificación al doctor.');
      navigate('/patient/appointments');
    } catch (err) {
      alert('Error al crear cita');
    }
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: '40px auto',
      background: '#f8fafd',
      padding: 30,
      borderRadius: 14,
      boxShadow: '0 2px 16px #e0e9f6'
    }}>
      <h2 style={{
        color: '#1565c0',
        textAlign: 'center',
        marginBottom: 28,
        fontWeight: 700,
        fontSize: 26
      }}>➕ Crear Cita Médica</h2>

      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: 16
      }}>
        <input
          type="text"
          placeholder="Motivo de consulta"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={input}
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={input}
        />

        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} style={input}>
          <option value="">Selecciona un médico</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name ? doc.name : doc.email}
            </option>
          ))}
        </select>

        <button type="submit" style={btn} disabled={loading}>
          {loading ? 'Cargando...' : 'Crear cita'}
        </button>
      </form>
    </div>
  );
}

const input: React.CSSProperties = {
  padding: '11px',
  borderRadius: 7,
  border: '1px solid #b7d0ee',
  fontSize: 17
};
const btn: React.CSSProperties = {
  padding: '13px',
  fontSize: 18,
  background: '#1565c0',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: 7
};
