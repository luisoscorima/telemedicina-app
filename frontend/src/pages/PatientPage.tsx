import { useNavigate } from 'react-router-dom';

const PatientPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bienvenido, paciente</h2>

      <button onClick={() => navigate('/patient/appointments')}>
        Ver mis citas
      </button>

      <button onClick={() => navigate('/patient/crear-cita')} style={{ marginLeft: '10px' }}>
        Agendar nueva cita
      </button>
    </div>
  );
};

export default PatientPage;
