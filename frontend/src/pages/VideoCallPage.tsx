import { useParams, useNavigate } from 'react-router-dom';

export default function VideoCallPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Videollamada Simulada</h2>
      <p><b>ID de la cita:</b> {appointmentId}</p>
      <div
        style={{
          width: 400,
          height: 300,
          margin: '0 auto',
          border: '2px dashed #777',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          color: '#666',
          background: '#f9f9f9'
        }}
      >
        [ Aquí iría el video en una integración real ]
      </div>
      <button
        style={{ marginTop: 20, fontSize: 18 }}
        onClick={() => {
          alert('Llamada finalizada (simulada)');
          navigate(-1); // Regresar a la página anterior
        }}
      >
        Finalizar llamada
      </button>
      <div style={{ marginTop: 30, color: '#999' }}>
        * Esta funcionalidad es solo una simulación para la práctica.<br/>
        Puedes describir aquí cómo lo harías en producción (WebRTC, Jitsi, etc).
      </div>
    </div>
  );
}
