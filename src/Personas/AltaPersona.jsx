import React from 'react'
import axios from 'axios';
import rutas from '../config.json'
import { useParams } from 'react-router';

export default function AltaPersona(props) {
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: '',
        alias: '',
        email: ''
    })

    const handleChangeNombre = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeApellido = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeAlias = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeEmail = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.email = e.target.value;
        setForm(nuevoState);
    }
     /***********************/
    /**Consulto personas registradas para validar el campo email, el cual debe ser único**/
    const [listadoPersonas, setListadoPersonas] = React.useState([]);


    /**consulta personas registradas**/
    const traerPersonas = async() => {
        try {
            const respuesta = await axios.get(rutas.personas);
            //el siguiente if previene que se pase un objeto a listadoPersona
            if(respuesta.data.length>0){
                setListadoPersonas(respuesta.data);
            }
        } catch(e) {
                alert('Error de conexión con la API:'+e.message);
      
        }
    }

    React.useEffect(() => {
        traerPersonas();
    }, [])
    /*********************/


    const guardar = async() => {
        try{
            if(form.nombre==''||form.apellido==''||form.alias==''||form.email==''){
                alert("No puede dejar vacío ninguno de los campos.")
            }
            else{
                const mailNoRepetido=listadoPersonas.filter(unaPersona=>unaPersona.email==form.email).length==0;
            
                if(mailNoRepetido){
                    await axios.post(rutas.personas, form);
                    props.history.push('/personas/');
                }
                else{
                    alert("El email con el que intenta resgistrarse esta siendo usado por otra persona.")
                }
           }
    }
        catch(e){
            alert("Error de conexión con la API: "+e.message);
        }
    }


    return (
        <div>
            <label for="Name">Nombre:</label><input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <label for="Name">Apellido:</label><input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChangeApellido}/><br/>
            <label for="Name">Alias:</label><input type="text" name="alias" placeholder="alias" value={form.alias} onChange={handleChangeAlias}/><br/>
            <label for="Name">Email:</label><input type="email" name="email" placeholder="email" value={form.email} onChange={handleChangeEmail}/><br/>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
