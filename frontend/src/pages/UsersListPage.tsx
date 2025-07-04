import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>({});

  const loadUsers = async () => {
    const res = await axios.get('/users');
    setUsers(res.data);
  };

  useEffect(() => { loadUsers(); }, []);

  // Crear usuario
  const handleCreate = async (e: any) => {
    e.preventDefault();
    await axios.post('/users', newUser);
    setNewUser({ name: '', email: '', password: '', role: 'patient' });
    loadUsers();
  };

  // Editar usuario
  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setEditingData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    await axios.patch(`/users/${editingId}`, editingData);
    setEditingId(null);
    setEditingData({});
    loadUsers();
  };

  // Eliminar usuario
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar usuario?')) {
      await axios.delete(`/users/${id}`);
      loadUsers();
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>

      {/* FORMULARIO CREAR */}
      <form onSubmit={handleCreate}>
        <input
          value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Nombre"
          required
        />
        <input
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          required
          type="email"
        />
        <input
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Contraseña"
          required
          type="password"
        />
        <select
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="patient">Paciente</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Crear usuario</button>
      </form>

      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            {/* MODO EDICIÓN */}
            {editingId === u.id ? (
              <form onSubmit={handleUpdate} style={{ display: 'inline-block' }}>
                <input
                  value={editingData.name}
                  onChange={e => setEditingData({ ...editingData, name: e.target.value })}
                  required
                />
                <input
                  value={editingData.email}
                  onChange={e => setEditingData({ ...editingData, email: e.target.value })}
                  required
                  type="email"
                />
                <input
                  value={editingData.password}
                  onChange={e => setEditingData({ ...editingData, password: e.target.value })}
                  placeholder="Nueva contraseña"
                  type="password"
                />
                <select
                  value={editingData.role}
                  onChange={e => setEditingData({ ...editingData, role: e.target.value })}
                >
                  <option value="patient">Paciente</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <b>{u.name}</b> - {u.email} - <b>{u.role}</b>
                <button style={{ marginLeft: 10 }} onClick={() => handleEdit(u)}>Editar</button>
                <button style={{ marginLeft: 5 }} onClick={() => handleDelete(u.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
