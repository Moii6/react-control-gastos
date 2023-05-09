import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPres }) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto valido");
      return;
    }
    setMensaje("");
    setIsValidPres(true);
  };
  return (
    <div className="contendor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
          <input type="submit" value="Añadir" />
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
