import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
/*Archivo de config. de endpoints*/
import rutas from '../config.json';



export default function LibrosPrestados(props) {
    const params=useParams();

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
        if (!params.id) return;
        traerLibros();
    }, [params])

    /****/
    const [listadoPersonas, setPersonas] = React.useState([]);
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
    /** librosPrestadosA: Recibe todos los libros y me devuelve los que estan prestados a el usuario idPersona**/
    const librosPrestadosA = (idPersona) => listadoLibros.filter( libro => libro.persona_id==idPersona);
    /***/
 
    return (
        <div>
             {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th> Libros prestados a {listadoPersonas.map(unaPersona=>{if(unaPersona.id==params.id){return unaPersona.alias;}})}</th>
                    </tr>
                </thead>
                <tbody>
                    {librosPrestadosA(params.id).length==0 ?<p>Este usuario no tiene libros prestados.<p/></p>:librosPrestadosA(params.id).map((unLibro) => (
                    <tr>
                            <td>{unLibro.nombre}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}



