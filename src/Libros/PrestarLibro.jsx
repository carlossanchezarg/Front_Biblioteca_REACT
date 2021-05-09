import React from 'react'
import axios from 'axios';
import rutas from '../config.json'
import { useParams } from 'react-router';

export default function AltaLibro(props) {

    const params = useParams();

    const [form, setForm] = React.useState({
        persona_id: ''     
    })


    const handleChangePersona = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    }

    /***/
 
    const [listadoPersonas, setListadoPersonas] = React.useState([]);
    const [hayPersonas, setHayPersonas] = React.useState(true);
    const [error, setErrorPersonas] = React.useState('');


    /**consulta personas registradas**/
    const traerPersonas = async() => {
        try {
            const respuesta = await axios.get(rutas.personas);
            //el siguiente if previene que se guarde la respuesta del server cuando no hay personas en la DB.
            if(respuesta.data.length>0){
                setListadoPersonas(respuesta.data);
                setErrorPersonas('');
            }else{setHayPersonas(false)}
        } catch(e) {
                alert('Error de conexión con la API:'+e.message);
                setErrorPersonas(e.message+'Error de conexión con la API');
      
        }
    }

    React.useEffect(() => {
        traerPersonas();
    }, [])

    /**Consulta libros**/    
    const [listaLibros, setListadoLibros] = React.useState([]);
    const [errorLibros, setErrorLibros] = React.useState('');
     
    const consultaLibros = async() => {
        try {
            const respuesta = await axios.get(rutas.libros);
            setListadoLibros(respuesta.data);
            setErrorLibros('');
        } 
        catch(e) {
            if (e.message=='Network error') {
                alert("Error de conexion con la API: "+e.message);
                setErrorLibros('Error de conexion con la API');
            } else {
                alert("Error de conexion con la API: "+e.message);
                setErrorLibros('Error inesperado.');
            }
        }
    }

    React.useEffect(() => {
        consultaLibros();   
    }, [])
 


    /**Prestar Libro ID a persona ID**/
    const Prestar = async(idPersona) => {
        try{
            if(idPersona==''){
                alert("Tiene que seleccionar una persona.")
            }
            else{
                const persona={persona_id:idPersona}
                await axios.put(rutas.prestar+params.id,persona);
                props.history.push('/libros/');
            }
        }
        catch(e){
            alert("Error de conexión con la API: libro id:"+params.id+"  Error "+e.message);
        }
    }
  

    return (
        <div>
        <div>
        {listaLibros.map(unLibro=>
            {
                <input>{unLibro.nombre}</input>
            })}
        </div>
            <label for="Name">Libro:</label><input type="text" name="Libro" placeholder="Libro" value={listaLibros.map(unLibro=>
                {
                    if(unLibro.id==params.id){
                        return unLibro.nombre+"(libro id:"+params.id+")";
                    }
                }).join('')} disabled/><br/>

            <label for="Name">Se presta a:</label><select name="Persona" onChange={handleChangePersona}>
                <option value="">Seleccione una persona</option>
                {hayPersonas && listadoPersonas.map(persona => (
                    <option value={persona.id}>
                        {persona.alias}
                    </option>
                ))}
            </select>
            <button onClick={()=>Prestar(form.persona_id)}>Prestar</button>
        </div>
    )
}
