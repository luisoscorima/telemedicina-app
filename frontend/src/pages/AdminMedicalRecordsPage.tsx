import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function AdminMedicalRecordsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/medical-history/all-grouped')
      .then(res => setGroups(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2>🩺 Historiales médicos de todos los pacientes</h2>
      {loading && <p>Cargando...</p>}
      {!loading && groups.length === 0 && <p>No hay registros médicos.</p>}
      <div>
        {groups.map((g: any) => (
          <div key={g.patient?.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            margin: '22px 0',
            padding: 18,
            background: '#fafbfc'
          }}>
            <h3 style={{ marginBottom: 6, color: '#1976d2' }}>
              Paciente: <b>{g.patient?.name || 'Desconocido'}</b> ({g.patient?.email})
            </h3>
            <ul style={{ paddingLeft: 18 }}>
              {g.records.map((rec: any) => (
                <li key={rec.id} style={{ marginBottom: 9 }}>
                  <span>
                    <b>Fecha:</b> {new Date(rec.createdAt).toLocaleString()}<br />
                    <b>Doctor:</b> {rec.doctor?.name || 'N/A'}<br />
                    <b>Descripción:</b> {rec.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
