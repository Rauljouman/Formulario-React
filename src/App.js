import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [vendes, setVendes] = useState([]);
  const [producte, setProducte] = useState('');
  const [quantitat, setQuantitat] = useState('');
  const [preu, setPreu] = useState('');
  const [dataVenda, setDataVenda] = useState('');
  const [editId, setEditId] = useState(null);

  // Para mostrar el mensaje de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Manejo de errores para los campos
  const [producteError, setProducteError] = useState('');
  const [quantitatError, setQuantitatError] = useState('');
  const [preuError, setPreuError] = useState('');
  const [dataVendaError, setDataVendaError] = useState('');

  useEffect(() => {
    fetchVendes();
  }, []);

  const fetchVendes = async () => {
    const response = await axios.get('http://localhost:3001/vendes');
    setVendes(response.data);
  };

  const addVenda = async () => {
    const vendaData = { producte, quantitat, preu, data_venda: dataVenda };
    await axios.post('http://localhost:3001/vendes', vendaData);
    fetchVendes();
    resetForm();
  };

  const updateVenda = async () => {
    const vendaData = { producte, quantitat, preu, data_venda: dataVenda };
    await axios.put(`http://localhost:3001/vendes/${editId}`, vendaData);
    fetchVendes();
    resetForm();
  };

  const deleteVenda = async (id) => {
    await axios.delete(`http://localhost:3001/vendes/${id}`);
    fetchVendes();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;

    if (producte.trim() === '') {
      setProducteError('El producte és obligatori');
      formIsValid = false;
    } else {
      setProducteError('');
    }

    if (quantitat.trim() === '' || isNaN(quantitat) || quantitat <= 0) {
      setQuantitatError('La quantitat ha de ser un número positiu');
      formIsValid = false;
    } else {
      setQuantitatError('');
    }

    if (preu.trim() === '' || isNaN(preu) || preu <= 0) {
      setPreuError('El preu ha de ser un número positiu');
      formIsValid = false;
    } else {
      setPreuError('');
    }

    if (dataVenda.trim() === '') {
      setDataVendaError('La data de venda és obligatòria');
      formIsValid = false;
    } else {
      setDataVendaError('');
    }

    if (formIsValid) {
      if (editId) {
        updateVenda();
      } else {
        addVenda();
      }
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  const resetForm = () => {
    setProducte('');
    setQuantitat('');
    setPreu('');
    setDataVenda('');
    setEditId(null);
    setProducteError('');
    setQuantitatError('');
    setPreuError('');
    setDataVendaError('');
  };

  const handleReset = () => {
    setProducte('');
    setQuantitat('');
    setPreu('');
    setDataVenda('');
    setEditId(null);
    
    setProducteError('El producte és obligatori');
    setQuantitatError('La quantitat ha de ser un número positiu');
    setPreuError('El preu ha de ser un número positiu');
    setDataVendaError('La data de venda és obligatòria');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-center">Gestió de Vendes</h2>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="producte">
              <Form.Label>Producte</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom del producte"
                value={producte}
                onChange={(e) => setProducte(e.target.value)}
                className={producteError ? 'is-invalid' : ''}
              />
              {producteError && <small className="text-danger">{producteError}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantitat">
              <Form.Label>Quantitat</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantitat"
                value={quantitat}
                onChange={(e) => setQuantitat(e.target.value)}
                className={quantitatError ? 'is-invalid' : ''}
              />
              {quantitatError && <small className="text-danger">{quantitatError}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="preu">
              <Form.Label>Preu</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Preu per unitat"
                value={preu}
                onChange={(e) => setPreu(e.target.value)}
                className={preuError ? 'is-invalid' : ''}
              />
              {preuError && <small className="text-danger">{preuError}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataVenda">
              <Form.Label>Data de Venda</Form.Label>
              <Form.Control
                type="date"
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
                className={dataVendaError ? 'is-invalid' : ''}
              />
              {dataVendaError && <small className="text-danger">{dataVendaError}</small>}
            </Form.Group>

            <Form.Group className="d-flex justify-content-between mt-3">
              <Button variant="primary" type="submit" className="w-50 me-2">
                {editId ? 'Actualitzar Venda' : 'Afegir Venda'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-50"
                onClick={handleReset}
              >
                Netejar
              </Button>
            </Form.Group>

          </Form>
          {showConfirmation && <p className="text-center text-success mt-3">Formulari enviat amb èxit</p>}
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Producte</th>
                <th>Quantitat</th>
                <th>Preu</th>
                <th>Data de Venda</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {vendes.map((venda, index) => (
                <tr key={venda.id}>
                  <td>{index + 1}</td>
                  <td>{venda.producte}</td>
                  <td>{venda.quantitat}</td>
                  <td>{venda.preu}</td>
                  <td>{new Date(venda.data_venda).toISOString().split('T')[0]}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setEditId(venda.id);
                        setProducte(venda.producte);
                        setQuantitat(venda.quantitat);
                        setPreu(venda.preu);
                        setDataVenda(new Date(venda.data_venda).toISOString().split('T')[0]);
                      }}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteVenda(venda.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
