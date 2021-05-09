import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import rutas from '../config.json';


export default function ListadoPersonas(props) {

    const [listadoPersonas, setListadoPersonas] = React.useState([]);
    const [hayPersonas, setHayPersonas] = React.useState(true);
    const [errorPersonas, setErrorPersonas] = React.useState('');
    


    /**consulta personas registradas**/
    const traerPersonas = async() => {
        try {
           
            const respuesta = await axios.get(rutas.personas);
            if(respuesta.data.length>0){
                setListadoPersonas(respuesta.data);
                setErrorPersonas('');
            }
            else{
                setHayPersonas(false)
            }
        } catch(e) {
                alert('Error de conexión con la API:'+e.message);
                setErrorPersonas('Error de conexión con la API: '+e.message);
      
        }
    }

    React.useEffect(() => {
        traerPersonas();
    }, [])

    /***Conulto libros**/
    const [listadoLibros, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    /** traerLibros: Devuelve todos los libros disponibles en la DB**/
    const traerLibros = async() => {
        try {
            const respuesta = await axios.get(rutas.libros);
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            alert("Error de conexión con la API: "+e.message);
            setError(e.message);
            
        }
    }

    React.useEffect(() => {
        traerLibros();
    }, [])
    
    /**Consulta libros prestados a la persona con ID**/
    const librosPrestados = (idPersona) => listadoLibros.filter( libro => libro.persona_id==idPersona);

    
    /**Borra una persona usando su id numerica**/
    const borrarPersona = async(idPersonaABorrar) => {
        try {
            if(librosPrestados(idPersonaABorrar).length>0){
                alert("Esta persona tiene libros prestados. No se puede borrar.")
            }else{
                await axios.delete(rutas.personas + idPersonaABorrar)
                traerPersonas();
            }
        } catch(e) {
            alert("Error: "+e.error);
            
        }
    }

    
    /***/
    

    return (
        <div>
            <Link to="/"><a>Volver a la página principal</a></Link>
            <h2>Biblioteca</h2>
            {errorPersonas ? <p>{errorPersonas}</p> : <></>}
            <h3>Administración de usuarios</h3>
            <button onClick={() => {props.history.push('/personas/agregar/')}}>Agregar persona</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Alias</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    { hayPersonas && listadoPersonas.map(unaPersona => (
                        <tr>
                            <td>{unaPersona.nombre}</td>
                            <td>{unaPersona.apellido}</td>
                            <td>{unaPersona.alias}</td>
                            <td>{unaPersona.email}</td>
                            <td>
                                <Link to={"/personas/editar/"+unaPersona.id.toString()}> <button disabled={!unaPersona}>Editar </button></Link>
                                <Link onClick={() => {if(window.confirm("¿Esta seguro que desea borrar a \""+unaPersona.nombre+"\"?")){borrarPersona(unaPersona.id);}}}><button>Borrar</button></Link>
                                <Link to={"/personas/libros_prestados/"+unaPersona.id.toString()}><button>Libros prestados</button></Link>                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}





