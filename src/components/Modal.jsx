import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import IconoCerrar from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEdit,
  setGastoEdit,
}) => {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEdit).length > 0) {
      setNombre(gastoEdit.nombre);
      setMonto(gastoEdit.monto);
      setCategoria(gastoEdit.categoria);
      setId(gastoEdit.id);
      setFecha(gastoEdit.fecha);
    }
  }, [gastoEdit]);

  const handleCerrarModal = () => {
    setAnimarModal(false);
    setGastoEdit({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, monto, categoria].includes("")) {
      setMensaje("todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    guardarGasto({ nombre, monto, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={IconoCerrar}
          alt="icono cerrar modal"
          onClick={handleCerrarModal}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerar"}`}
      >
        <legend>{gastoEdit.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre del Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="monto">Monto</label>
          <input
            id="monto"
            type="number"
            placeholder="Añade el monto del gasto"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Monto</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione -- </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="salud">Salud</option>
            <option value="servicios">Servicios</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEdit.nombre ? "Guardar Cambios" : "Agregar Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
