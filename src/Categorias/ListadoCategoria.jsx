import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import rutas from '../config.json';


export default function ListadoCategoria(props) {

    const [listado, setListado] = React.useState([]);
    const [hayCategorias, setHayCategorias] = React.useState(true);
    const [error, setError] = React.useState('');


    /**consulta categorias registradas**/
    const traerCategorias = async() => {
        try {
            const respuesta = await axios.get(rutas.categorias);
            setListado(respuesta.data);
            if(respuesta.data.length==0){
                setHayCategorias(false);
            }
            setError('');
        } catch(e) {
                alert('Error de conexión con la API:'+e.message);
                setError(e.message+'Error de conexión con la API');
      
        }
    }

    React.useEffect(() => {
        traerCategorias();
    }, [])

    /****consulto libros para hacer validación: categoria en uso.*/
    const [listaLibros, setListadoLibros] = React.useState([]);
    const [errorLibros, setErrorLibros] = React.useState('');
     
    const consultaLibros = async() => {
        try {
            const respuesta = await axios.get(rutas.libros);
            setListadoLibros(respuesta.data);
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
      

    /**Borra una categoria usando su id numerica**/

    const borrarCategoria = async(idCategoria) => {
        try {
            const librosEnLaCategoria=listaLibros.filter((unLibro=>unLibro.categoria_id==idCategoria));
            if(librosEnLaCategoria.length==0){
                await axios.delete(rutas.categorias + idCategoria)
                traerCategorias();
            }
            else{
                alert("Esta categoría no se puede borrar, esta siendo utilizada por alguno de los libros.")
            }
        } catch(e) {
            alert("No se puedo borrar: "+e.error);
            
        }
    }

    
    /***/
    

    return (
        <div>
            <Link to="/"><a>Volver a la página principal</a></Link>
            <h2>Biblioteca</h2>
            {error ? <>Error en la conexión</> : <></>}
            <h3>Adminsitración de categorias</h3>
            <button onClick={() => {props.history.push('/categorias/agregar/')}}>Agregar categoría</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>ID Categoria</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {hayCategorias && listado.map(unaCategoria => (
                        <tr>
                            <td>{unaCategoria.nombre}</td>
                            <td>{unaCategoria.id}</td>
                            <td>
                                <Link onClick={() => {if(window.confirm("¿Esta seguro que desea borrar a \""+unaCategoria.nombre+"\"?")){borrarCategoria(unaCategoria.id);}}}><button>Borrar</button></Link>
                                <Link to={"/categorias/libros/"+unaCategoria.id}><button>Libros pertenecientes a la categoria.</button></Link>                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}

