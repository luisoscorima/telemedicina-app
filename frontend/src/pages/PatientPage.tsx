import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PatientPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  

  return (
    <div style={{
      maxWidth: 500,
      margin: '40px auto',
      background: '#f8fafd',
      padding: 36,
      borderRadius: 14,
      boxShadow: '0 2px 16px #e0e9f6'
    }}>
      <h2 style={{
        color: '#1565c0',
        textAlign: 'center',
        marginBottom: 32,
        fontWeight: 700,
        fontSize: 30
      }}>
        👤 ¡Bienvenido, {user?.name || 'paciente'}!
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }}>
        <button
          onClick={() => navigate('/patient/appointments')}
          style={btn}
        >
          📅 Ver mis citas
        </button>

        <button
          onClick={() => navigate('/patient/crear-cita')}
          style={btn}
        >
          ➕ Agendar nueva cita
        </button>

        <button
          onClick={() => navigate('/patient/medical-history')}
          style={btn}
        >
          🩺 Ver mi historial médico
        </button>
      </div>
    </div>
  );
};

// Un solo estilo para todos los botones
const btn: React.CSSProperties = {
  padding: '15px',
  fontSize: 18,
  background: '#1565c0',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600,
  boxShadow: '0 1px 4px #e0e9f6',
  transition: 'background 0.2s',
};

export default PatientPage;
