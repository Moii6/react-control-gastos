import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPres, setIsValidPres] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEdit, setGastoEdit] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  /** accion que se ejecuta cuando hay un nuevo gasto para editar */
  useEffect(() => {
    if (Object.keys(gastoEdit).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 100);
    }
  }, [gastoEdit]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) setIsValidPres(true);
  }, []);

  useEffect(() => {
    if (filtro) {
      //filtrando gastos por categoria
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEdit({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 100);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualizar gasto existente
      const gastosUpdate = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosUpdate);
      setGastoEdit({});
    } else {
      //crear un nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eiminarGasto = (id) => {
    //en esta ocsion la funcion filter va a retornar todos los que cumplan con la condicion
    //todos los que tengan id diferente al que se paso por parametro
    const gastosUpdated = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosUpdated);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPres={isValidPres}
        setIsValidPres={setIsValidPres}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPres && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEdit={setGastoEdit}
              eiminarGasto={eiminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEdit={gastoEdit}
          setGastoEdit={setGastoEdit}
        />
      )}
    </div>
  );
}

export default App;
