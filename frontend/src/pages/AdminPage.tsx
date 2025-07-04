import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>👑 Panel del Administrador</h2>
      <div style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '18px',
        marginTop: 30
      }}>
        <button style={{ width: 230 }} onClick={() => navigate('/admin/users')}>
          👥 Gestión de Usuarios
        </button>
        <button style={{ width: 230 }} onClick={() => navigate('/admin/appointments')}>
          📅 Todas las Citas
        </button>
        <button style={{ width: 230 }} onClick={() => navigate('/admin/medical-records')}>
          🩺 Historiales Médicos
        </button>
      </div>
      <div style={{ marginTop: 40, textAlign: 'center', color: '#888' }}>
        <b>Bienvenido/a, Admin</b>
        <br />
        Puedes gestionar usuarios, citas y ver historiales médicos.
      </div>
    </div>
  );
}
