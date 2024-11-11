import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilo de Bootstrap

const Formulari = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [genere, setGenere] = useState('');
  const [acceptaCondicions, setAcceptaCondicions] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nomError, setNomError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Función para gestionar el cambio en los campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAcceptaCondicions(checked);
    } else {
      if (name === 'nom') setNom(value);
      if (name === 'email') setEmail(value);
      if (name === 'genere') setGenere(value);
    }
  };

  // Función para gestionar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formIsValid = true;
    
    // Validar el nom
    if (nom.trim() === '') {
      setNomError('El nom és obligatori');
      formIsValid = false;
    } else {
      setNomError('');
    }
    
    // Validar el correu electrònic
    if (!email.includes('@')) {
      setEmailError('El correu electrònic ha de tenir un @');
      formIsValid = false;
    } else {
      setEmailError('');
    }
    
    if (formIsValid) {
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000); // El mensaje de confirmación desaparece después de 3 segundos
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        
        {/* Campo de nombre */}
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            className={`form-control ${nomError ? 'is-invalid' : ''}`}  // Clase de error si hay mensaje
            value={nom}
            onChange={handleChange}
          />
          {nomError && <div className="invalid-feedback">{nomError}</div>}  {/* Mensaje de error */}
        </div>
        
        {/* Campo de correo */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${emailError ? 'is-invalid' : ''}`}  // Clase de error si hay mensaje
            value={email}
            onChange={handleChange}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}  {/* Mensaje de error */}
        </div>
        
        {/* Campo de género */}
        <div className="mb-3">
          <label htmlFor="genere" className="form-label">Gènere</label>
          <select
            id="genere"
            name="genere"
            className="form-select"
            value={genere}
            onChange={handleChange}
          >
            <option value="">Selecciona...</option>
            <option value="home">Home</option>
            <option value="dona">Dona</option>
          </select>
        </div>
        
        {/* Checkbox para aceptar condiciones */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="acceptaCondicions"
            name="acceptaCondicions"
            className="form-check-input"
            checked={acceptaCondicions}
            onChange={handleChange}
          />
          <label htmlFor="acceptaCondicions" className="form-check-label">
            Accepto les condicions
          </label>
        </div>
        
        {/* Botón de envío */}
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
      
      {/* Mensaje de confirmación */}
      {showConfirmation && <p className="mt-3 text-success">Formulari enviat amb èxit</p>}
    </div>
  );
};

export default Formulari;
