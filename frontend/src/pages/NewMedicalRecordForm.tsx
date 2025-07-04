import React, { useState } from 'react';
import axios from '../api/axios';

interface Props {
  patientId: string;
  onCreated: () => void;
}

export default function NewMedicalRecordForm({ patientId, onCreated }: Props) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (description.trim().length < 5) {
      setError('La descripción debe tener al menos 5 caracteres.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/medical-history', { patientId, description });
      setSuccess('Diagnóstico registrado (simulación: se enviaría alerta por email)');
      setDescription('');
      onCreated();
    } catch {
      setError('Error al guardar el registro médico');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: 12,
        background: '#f7fbff',
        border: '1px solid #d6e3f3',
        borderRadius: 10,
        padding: 16,
        boxShadow: '0 1px 10px #e0e9f6'
      }}
    >
      <h4 style={{ marginTop: 0, color: '#1976d2' }}>➕ Nuevo registro médico</h4>
      <textarea
        placeholder="Descripción del diagnóstico o atención"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        minLength={5}
        rows={3}
        style={{
          width: '100%',
          fontSize: 16,
          borderRadius: 6,
          border: '1px solid #b7d0ee',
          padding: 8,
          resize: 'vertical',
          marginBottom: 10,
        }}
        disabled={loading}
      />
      <br />
      <button
        type="submit"
        disabled={loading}
        style={{
          background: '#1976d2',
          color: '#fff',
          padding: '9px 18px',
          border: 'none',
          borderRadius: 7,
          fontWeight: 600,
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginRight: 10
        }}
      >
        {loading ? 'Guardando...' : 'Guardar registro'}
      </button>
      {error && <span style={{ color: '#d32f2f', marginLeft: 10 }}>{error}</span>}
      {success && <span style={{ color: '#388e3c', marginLeft: 10 }}>{success}</span>}
    </form>
  );
}
