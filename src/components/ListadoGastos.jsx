import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEdit,
  eiminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {" "}
            {gastosFiltrados.length
              ? "Tus Gastos"
              : "No hay Gastos en esta categoria"}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEdit={setGastoEdit}
              eiminarGasto={eiminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2> {gastos.length ? "Tus Gastos" : "No hay Gastos"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEdit={setGastoEdit}
              eiminarGasto={eiminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
