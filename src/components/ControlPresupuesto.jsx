import { useState, useEffect } from "react";
import { formatoCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPres,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.monto + total,
      0
    );
    //calculo del procentaje disponible
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1250);
  }, [gastos]);

  const handleResetApp = () => {
    const resultado = confirm(
      "Estas seguro? Se eliminaran el presupuesto y todos los gastos"
    );
    if (resultado) {
      setIsValidPres(false);
      setPresupuesto(0);
      setGastos([]);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        value={porcentaje}
        text={`${porcentaje}% Gastado`}
        styles={buildStyles({
          pathColor: porcentaje > 100 ? "#dc2626" : "#3B82F6",
          trailColor: "#F5F5F5",
          textColor: porcentaje > 100 ? "#dc2626" : "#3B82F6",
        })}
      />
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reiniciar App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatoCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatoCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatoCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
