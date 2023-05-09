import { useState, useEffect } from "react";

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="Filtro">Filtrar gastos</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="salud">Salud</option>
            <option value="servicios">Servicios</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
