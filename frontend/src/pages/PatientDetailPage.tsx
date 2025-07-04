import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import NewMedicalRecordForm from './NewMedicalRecordForm';
import PatientMedicalHistoryMini from './PatientMedicalHistoryMini';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function PatientDetailPage() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<User | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  useEffect(() => {
    if (!patientId) return;
    axios.get(`/users/${patientId}`)
      .then(res => setPatient(res.data))
      .catch(() => setPatient(null));
  }, [patientId]);

  if (!patientId) return <div>No se proporcionó paciente.</div>;
  if (!patient) return <div>Cargando datos del paciente...</div>;

  return (
    <div style={{
      maxWidth: 700,
      margin: '0 auto',
      padding: 24,
      background: '#f8fafb',
      borderRadius: 16,
      boxShadow: '0 2px 12px #e4ecf7'
    }}>
      <h2 style={{ color: '#1976d2', marginBottom: 8 }}>👤 Detalle del Paciente</h2>
      <p><b>Nombre:</b> {patient.name}</p>
      <p><b>Email:</b> {patient.email}</p>

      <div style={{ marginTop: 30 }}>
        <h3 style={{ color: '#1565c0' }}>Historial Médico</h3>
        <PatientMedicalHistoryMini key={refreshHistory} patientId={patientId} />

        <NewMedicalRecordForm
          patientId={patientId}
          onCreated={() => setRefreshHistory(prev => prev + 1)}
        />
      </div>
    </div>
  );
}
