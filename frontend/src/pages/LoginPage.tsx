import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Leer el token directamente después del login
      const token = localStorage.getItem('token');
      const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;

      if (decoded?.role === 'admin') navigate('/admin');
      else if (decoded?.role === 'doctor') navigate('/doctor');
      else if (decoded?.role === 'patient') navigate('/patient');
      else navigate('/unauthorized');
    } catch (err) {
      alert('Login fallido');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default LoginPage;
