import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function AllAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/appointments')
      .then(res => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2 style={{
        margin: '24px 0 12px 0',
        color: '#1a237e'
      }}>
        📅 Todas las Citas Agendadas
      </h2>
      {loading && <p>Cargando...</p>}
      {!loading && appointments.length === 0 && (
        <p>No hay citas registradas.</p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
        {appointments.map((a) => (
          <div
            key={a.id}
            style={{
              border: '1px solid #e3e3e3',
              borderRadius: 10,
              background: '#fff',
              boxShadow: '0 1px 8px #e3e9f2',
              padding: 20,
              minWidth: 320,
              maxWidth: 420,
              flex: '1 0 320px',
              marginBottom: 16
            }}
          >
            <div style={{
              fontWeight: 'bold',
              color: '#283593',
              marginBottom: 6,
              fontSize: 17
            }}>
              Motivo: {a.reason}
            </div>
            <div>
              <b>Paciente:</b> {a.patient?.name || <span style={{color:'#b71c1c'}}>No asignado</span>}<br />
              <b>Doctor:</b> {a.doctor?.name || <span style={{color:'#b71c1c'}}>No asignado</span>}<br />
              <b>Fecha:</b> {a.date && new Date(a.date).toLocaleString()}<br />
              <b>Estado:</b>{' '}
              <span style={{
                color: a.status === 'confirmed' ? '#388e3c' : a.status === 'cancelled' ? '#c62828' : '#fbc02d',
                fontWeight: 'bold'
              }}>
                {a.status === 'confirmed' && '✔️ Confirmada'}
                {a.status === 'pending' && '⏳ Pendiente'}
                {a.status === 'cancelled' && '❌ Cancelada'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
