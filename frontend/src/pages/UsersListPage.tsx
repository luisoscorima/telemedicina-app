import { useEffect, useState } from 'react';
import axios from '../api/axios';

const roles = ['admin', 'doctor', 'patient'];

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [editing, setEditing] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editing) {
        await axios.patch(`/users/${editing.id}`, form);
        setSuccess('Usuario actualizado');
        setEditing(null);
      } else {
        await axios.post('/users', form);
        setSuccess('Usuario creado');
      }
      setForm({ name: '', email: '', password: '', role: 'patient' });
      loadUsers();
    } catch {
      setError('Ocurrió un error');
    }
  };

  const handleEdit = (user: any) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      try {
        await axios.delete(`/users/${id}`);
        setSuccess('Usuario eliminado');
        loadUsers();
      } catch {
        setError('No se pudo eliminar');
      }
    }
  };

  return (
    <div className="container">
      <h2>👥 Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <fieldset style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
          <legend style={{ color: '#1976d2', fontWeight: 600 }}>
            {editing ? 'Editar Usuario' : 'Crear Usuario'}
          </legend>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            required
            disabled={!!editing} // Evita cambiar email en edición
          />
          <input
            type="password"
            name="password"
            placeholder={editing ? 'Nueva contraseña (opcional)' : 'Contraseña'}
            value={form.password}
            onChange={handleChange}
            required={!editing}
          />
          <select name="role" value={form.role} onChange={handleChange}>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="submit" style={{ marginTop: 8 }}>
            {editing ? 'Guardar cambios' : 'Crear usuario'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '', password: '', role: 'patient' }); }} style={{ background: '#aaa', marginLeft: 6 }}>
              Cancelar
            </button>
          )}
        </fieldset>
      </form>

      {error && <div style={{ background: '#ffebee', color: '#b71c1c', borderRadius: 7, padding: 8 }}>{error}</div>}
      {success && <div style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 7, padding: 8 }}>{success}</div>}

      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            <b>{u.name}</b> <span style={{ color: '#555' }}>({u.role})</span><br />
            <span style={{ fontSize: 13, color: '#888' }}>{u.email}</span>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => handleEdit(u)}>📝 Editar</button>
              <button style={{ background: '#b71c1c' }} onClick={() => handleDelete(u.id)}>🗑️ Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
