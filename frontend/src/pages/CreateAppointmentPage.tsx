import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateAppointmentPage() {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar doctores disponibles
    axios.get('/users')
      .then(res => {
        const onlyDoctors = res.data.filter((user: any) => user.role === 'doctor');
        setDoctors(onlyDoctors);
      })
      .catch(err => {
        alert('Error al cargar doctores');
        console.error(err);
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/appointments', { reason, date, doctorId });
      alert('Cita creada exitosamente');
      navigate('/patient');
    } catch (err) {
      alert('Error al crear cita');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Crear Cita Médica</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Motivo"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Selecciona un médico</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>
        <button type="submit">Crear cita</button>
      </form>
    </div>
  );
}
