import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import rutas from '../config.json';


export default function LibrosCategoria() {
    const params=useParams();

    const [listado, setListado] = React.useState([]);
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

    /**consulta categorias registradas**/
    const [listadoCategorias, setListadoCategorias] = React.useState([]);
    const [errorCategorias, setErrorCategorias] = React.useState('');

    const traerCategorias = async() => {
        try {
            const respuesta = await axios.get(rutas.categorias);
            setListadoCategorias(respuesta.data);
            setErrorCategorias('');
        } catch(e) {
                alert('Error de conexión con la API:'+e.message);
                setErrorCategorias(e.message+'Error de conexión con la API');
      
        }
    }

    React.useEffect(() => {
        traerCategorias();
    }, [])

    /** librosPrestadosA: Recibe todos los libros y me devuelve los que estan prestados a el usuario idPersona**/
    const librosDeLaCategoria = (idCategoria) => {
        return listado.filter( libro => libro.categoria_id==idCategoria);
    }
    /***/
 
    return (
        <div>
             {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th> Libros en la categoría:"{listadoCategorias.map(unaCategoria=>
                            {
                                if(unaCategoria.id==params.id){
                                    return unaCategoria.nombre;
                                }
                            })}"
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {librosDeLaCategoria(params.id).length==0 ?"Esta categoría no tiene libros asociados.":librosDeLaCategoria(params.id).map((unLibro) => (
                    <tr>
                            <td>{unLibro.nombre}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}
