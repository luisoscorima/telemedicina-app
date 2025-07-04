import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function AllAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/appointments')
      .then(res => setAppointments(res.data))
      .catch(() => setAppointments([]));
  }, []);

  return (
    <div>
      <h2>Todas las Citas</h2>
      <ul>
        {appointments.map((a: any) => (
          <li key={a.id}>
            Motivo: {a.reason} <br />
            Paciente: {a.patient?.name} <br />
            Doctor: {a.doctor?.name} <br />
            Estado: {a.status}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
