import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Panel del Administrador</h2>
      <button onClick={() => navigate('/admin/users')}>Ver Usuarios</button>
      <button onClick={() => navigate('/admin/appointments')} style={{marginLeft: 12}}>Ver Citas</button>
      {/* Más botones si creas más vistas */}
    </div>
  );
}
