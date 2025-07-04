import React, { useState } from 'react';
import axios from '../api/axios';

export default function NewMedicalRecordForm({ patientId, onCreated }: { patientId: string, onCreated: () => void }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/medical-history', { patientId, description });
      setDescription('');
      onCreated();
    } catch (err: any) {
      setError('Error al guardar el registro médico');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <h4>Nuevo registro médico</h4>
      <textarea
        placeholder="Descripción del diagnóstico o atención"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        minLength={5}
        rows={3}
        style={{ width: '100%' }}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar registro'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
