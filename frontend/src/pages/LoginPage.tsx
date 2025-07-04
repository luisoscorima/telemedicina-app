import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      const token = localStorage.getItem('token');
      const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;

      if (decoded?.role === 'admin') navigate('/admin');
      else if (decoded?.role === 'doctor') navigate('/doctor');
      else if (decoded?.role === 'patient') navigate('/patient');
      else navigate('/unauthorized');
    } catch (err) {
      setError('Login fallido. Verifica usuario/contraseña.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 80 }}>
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <span role="img" aria-label="login" style={{ fontSize: 46 }}>🔐</span>
        <h2>Iniciar Sesión</h2>
        <p style={{ color: '#666', fontSize: 16 }}>Telemedicina App</p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          autoFocus
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: 14 }}>Ingresar</button>
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#b71c1c',
            padding: '9px 0',
            borderRadius: 7,
            marginTop: 12,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
      </form>
      <div style={{ color: '#aaa', fontSize: 13, textAlign: 'center', marginTop: 32 }}>
        <b>Usuarios de prueba:</b>
        <ul style={{ margin: '8px 0 0 0', padding: 0, fontSize: 13, color: '#888' }}>
          <li>admin@demo.com / 123456789 (admin)</li>
          <li>doctor@demo.com / 123456789 (doctor)</li>
          <li>paciente@demo.com / 123456789 (paciente)</li>
        </ul>
      </div>
    </div>
  );
}
