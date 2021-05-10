import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import rutas from '../config.json';



export default function ListadoLibros(props) {

    const [listaLibros, setListado] = React.useState([]);
    const [hayLibros, setHayLibros] = React.useState(true);
    const [error, setError] = React.useState('');
     
    const consultaLibros = async() => {
        try {
            const respuesta = await axios.get(rutas.libros);
            setListado(respuesta.data);
            if(respuesta.data.length==0){
                setHayLibros(false)
            }
            setError('');
        } 
        catch(e) {
            if (e.message=='Network error') {
                alert("Error de conexion con la API: "+e.message);
                setError('Error de conexion con la API');
            } else {
                alert("Error de conexion con la API: "+e.message);
                setError('Error inesperado.');
            }
        }
    }

    React.useEffect(() => {
        consultaLibros();   
    }, [])

    

    /***/
    const [listaPersonas, setPersonas] = React.useState([]);
    const [errorPersonas, setErrorPersonas] = React.useState('');
     
    const consultaPersonas = async() => {
        try {
            const respuesta = await axios.get(rutas.personas);
            setPersonas(respuesta.data);
            setErrorPersonas('');
        } 
        catch(e) {
            if (e.message=='Network error') {
                alert("Error de conexion con la API: "+e.message);
                setError('Error de conexion con la API');
            } else {
                alert("Error de conexion con la API: "+e.message);
                setError('Error inesperado.');
            }
        }
    }

    React.useEffect(() => {
        consultaPersonas();   
    }, [])

   
  

    /***/

    const borrarLibro = async(idLibroABorrar) => {
        try {
            if(!listaLibros.filter((unLibro)=>idLibroABorrar==unLibro.id).persona_id){
                await axios.delete(rutas.libros + idLibroABorrar);
                consultaLibros();
            }else{
                alert("No se puede borrar. Ese libro esta prestado!")
            }
        } catch(e) {
            alert("No se puede borrar! Ese libro esta prestado!");
            
        }
    }
/***/
    const devolverLibro = async(idLibroADevolver) => {
        try {
            await axios.put(rutas.devolver + idLibroADevolver)
            consultaLibros();
        } catch(e) {
            alert("No se puede devolver.Ese libro no esta prestado.");
            
        }
    }
    
   
    return(
        
        <div>
            <>
            <Link to="/"><a>Volver a la página principal</a></Link>
            </> 
            <h1>Biblioteca</h1>
            {error ? <>Error en la conexión</> : <></>}
            <h3>Catálogo de libros</h3>
            <button onClick={() => {props.history.push('/libros/agregar/')}}>Agregar nuevo libro</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Libro ID</th>
                        <th>Categoria ID</th>
                        <th>opciones</th>
                        <th> Prestamos </th>
                        <th>Prestamo/devolución</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {hayLibros && listaLibros.map(unLibro => (
                        <tr>
                            <td>{unLibro.nombre}</td>
                            <td>{unLibro.descripcion}</td> 
                            <td>{unLibro.id}</td>
                            <td>{unLibro.categoria_id}</td>
                            <td>
                            <Link onClick={() =>
                                {if(window.confirm("¿Esta seguro que desea borrar \""+unLibro.nombre+"\"?")){borrarLibro(unLibro.id);}}
                                }><button> Borrar </button>
                            </Link>         
                            <Link to={"/libros/editar/"+unLibro.id}><button> Editar </button></Link>  
                            </td>
                            
                            <td >{!unLibro.persona_id ? "Disponible" :"Prestado a: \" "+listaPersonas.map(unaPersona=>
                                    {
                                        if(unaPersona.id==unLibro.persona_id){
                                            return unaPersona.alias;
                                        }
                                    }
                                ).join('')+"\""}
                            </td>
                            <td>
                            <Link to={"/libros/prestar/"+unLibro.id}><button disabled={unLibro.persona_id}>Prestar</button></Link>
                            <Link onClick={() => devolverLibro(unLibro.id)}><button disabled={!unLibro.persona_id}>Devolver</button></Link> 
                            </td>                                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}