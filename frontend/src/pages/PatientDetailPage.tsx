import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import NewMedicalRecordForm from './NewMedicalRecordForm';
import PatientMedicalHistoryMini from './PatientMedicalHistoryMini';

interface User {
  id: string;
  name: string;
  email: string;
  // Agrega más campos si tienes
}

export default function PatientDetailPage() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<User | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  useEffect(() => {
    // Carga los datos del paciente
    if (!patientId) return;
    axios.get(`/users/${patientId}`)
      .then(res => setPatient(res.data))
      .catch(() => setPatient(null));
  }, [patientId]);

  if (!patientId) return <div>No se proporcionó paciente.</div>;
  if (!patient) return <div>Cargando datos del paciente...</div>;

  return (
    <div>
      <h2>Detalle del Paciente</h2>
      <p><b>Nombre:</b> {patient.name}</p>
      <p><b>Email:</b> {patient.email}</p>
      {/* Agrega más campos si tienes */}

      <h3>Historial Médico</h3>
      <PatientMedicalHistoryMini key={refreshHistory} patientId={patientId} />

      <NewMedicalRecordForm
        patientId={patientId}
        onCreated={() => setRefreshHistory(prev => prev + 1)}
      />
    </div>
  );
}
