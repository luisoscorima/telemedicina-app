import { useParams, useNavigate } from 'react-router-dom';

export default function VideoCallPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: 500,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 6px 36px 0 #a2a5b93b',
      padding: 32,
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#1877f2', marginBottom: 24 }}>👨‍⚕️ Videollamada Médica (Simulada)</h2>
      <div style={{ marginBottom: 10, color: '#555', fontSize: 18 }}>
        <b>ID de la cita:</b> <span style={{ color: '#1877f2' }}>{appointmentId}</span>
      </div>
      <div
        style={{
          width: 380,
          height: 220,
          margin: '20px auto',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #eef2f7 60%, #e1f1ff 100%)',
          border: '2px solid #d2e3fc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'relative'
        }}
      >
        {/* Simulación de Avatares */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: '#ffebee', margin: '0 auto 5px', fontSize: 32, display: 'flex',
            alignItems: 'center', justifyContent: 'center', border: '2px solid #eea4a8'
          }}>👨‍⚕️</div>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Dr. Video</span>
        </div>
        <div style={{
          width: 2, height: 80, background: '#d2e3fc', margin: '0 10px'
        }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: '#e3f2fd', margin: '0 auto 5px', fontSize: 32, display: 'flex',
            alignItems: 'center', justifyContent: 'center', border: '2px solid #90caf9'
          }}>🧑</div>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Paciente</span>
        </div>
        <span style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          color: '#b0b8c1', fontSize: 18, pointerEvents: 'none', opacity: 0.7
        }}>
          [ Aquí iría el video real ]
        </span>
      </div>
      <button
        style={{
          marginTop: 28, padding: '12px 38px', fontSize: 17, borderRadius: 8, border: 'none',
          background: 'linear-gradient(90deg, #1877f2 80%, #45a3f9 100%)', color: '#fff',
          fontWeight: 600, cursor: 'pointer', transition: 'background .3s'
        }}
        onClick={() => {
          alert('Llamada finalizada (simulada)');
          navigate(-1);
        }}
      >
        Finalizar llamada
      </button>
      <div style={{ marginTop: 36, color: '#666', fontSize: 15 }}>
        <span style={{ fontSize: 20 }}>ℹ️</span> <br />
        Esta es una simulación de videollamada.<br />
        <span style={{ color: '#1877f2' }}>En producción</span> usarías <b>WebRTC</b>, <b>Jitsi Meet</b>, <b>Zoom SDK</b> u otros servicios de video.
      </div>
    </div>
  );
}
