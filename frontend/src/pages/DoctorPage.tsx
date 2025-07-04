import { useNavigate } from 'react-router-dom';

const DoctorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Bienvenido, doctor</h2>

      <button onClick={() => navigate('/doctor/appointments')}>
        Ver mis citas
      </button>
    </div>
  );
};

export default DoctorPage;
