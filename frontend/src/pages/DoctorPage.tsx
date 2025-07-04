import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function DoctorPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container" style={{ maxWidth: 550, margin: '0 auto', textAlign: 'center', paddingTop: 48 }}>
      <h2 style={{ color: '#1976d2', fontWeight: 700, marginBottom: 20 }}>
        👨‍⚕️ Bienvenido, Dr(a). {user?.name || user?.email}
      </h2>
      <p style={{ color: '#263238', fontSize: 18, marginBottom: 34 }}>
        Acceda rápidamente a sus funciones de médico:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <button
          style={{
            width: 240,
            background: '#1565c0',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            fontSize: 18,
            fontWeight: 600,
            padding: '14px 0',
            boxShadow: '0 2px 6px #e3e9f2',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => navigate('/doctor/appointments')}
        >
          📅 Ver mis citas
        </button>
        <button
          style={{
            width: 240,
            background: '#43a047',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            fontSize: 18,
            fontWeight: 600,
            padding: '14px 0',
            boxShadow: '0 2px 6px #e3e9f2',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => alert('¡Pronto podrás acceder a tu perfil de médico!')}
        >
          🧑‍⚕️ Mi perfil
        </button>
      </div>
    </div>
  );
}
