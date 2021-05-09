import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import rutas from '../config.json';


export default function EditarPersona(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: '',
        alias:'',
        email:''
    })

    const buscarPersonaPorId = async(idPersona) => {
        try {
            const respuesta = await axios.get(rutas.personas+idPersona)
            setForm(respuesta.data)
        } catch(e) {

        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarPersonaPorId(params.id)
    }, [params])

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeApellido = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeAlias = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    }

    const guardar = async() => { 
        try{
            if(form.nombre==''||form.apellido==''||form.alias==''){
                alert("No puede dejar vacío ninguno de los campos.")
            }
            else{
                await axios.put(rutas.personas+params.id, form);
                props.history.push('/personas/');
            }
        }catch(e){
            return({message:e.error});
        }
    }

    /***/

    return (
        <div>
            <label for="Name">Nombre:</label><input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <label for="Name">Apellido:</label><input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChangeApellido}/><br/>
            <label for="Name">Alias:</label><input type="text" name="alias" placeholder="alias" value={form.alias} onChange={handleChangeAlias}/><br/>
            <label for="Name">Email:</label><input type="text" name="email" placeholder="email" value={form.email}  disabled/><br/>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
