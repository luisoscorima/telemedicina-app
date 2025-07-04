import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function AdminMedicalRecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    axios.get('/medical-history')
      .then(res => setRecords(res.data));
  }, []);

  const startEditing = (id: string, desc: string) => {
    setEditingId(id);
    setNewDesc(desc);
  };

  const saveEdit = async (e: any) => {
    e.preventDefault();
    if (!editingId) return;
    await axios.patch(`/medical-history/${editingId}`, { description: newDesc });
    setEditingId(null);
    // recargar lista
    const res = await axios.get('/medical-history');
    setRecords(res.data);
  };

  const deleteRecord = async (id: string) => {
    await axios.delete(`/medical-history/${id}`);
    setRecords(records.filter(r => r.id !== id));
  };

  return (
    <ul>
      {records.map((rec) => (
        <li key={rec.id}>
          <b>Descripción:</b> {rec.description}
          <button onClick={() => startEditing(rec.id, rec.description)}>Editar</button>
          <button onClick={() => deleteRecord(rec.id)}>Eliminar</button>
          {editingId === rec.id && (
            <form onSubmit={saveEdit}>
              <input value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              <button type="submit">Guardar</button>
            </form>
          )}
        </li>
      ))}
    </ul>
  );
}
