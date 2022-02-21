import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";


function App() {

  const [pacientes, setPacientes] = useState([]); //lista de pacientes en plural
  const [paciente, setPaciente] = useState({}); //objeto vacio que alberga la informacion de 1 paciente en singular

  //el orden de ejecucion de los useEffect es importante, queremos que se cargue una sola vez cuando el componente este listo
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

      //Una vez obtenidos los pacientes de LS los seteamos en nuestro arreglo de pacientes
      setPacientes(pacientesLS);
    }

    obtenerLS();
  }, []) //El arreglo vacio indica que solo se va a ejecutar una sola vez

  //Almacenar nuestros pacientes usando LocalStorage, sincroniza el state con lo que haya en pacientes
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])
  
  //Funcion para eliminar paciente, y se pasa via props hasta paciente
  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);

    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />

      </div>
    </div>
  )
}

export default App
