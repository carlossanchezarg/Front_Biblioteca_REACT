import React from 'react'
import axios from 'axios';
import rutas from '../config.json'

export default function AltaCategoria(props) {

    const [form, setForm] = React.useState({
        nombre: ''
    })



    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }


   
    /***/
    const [categorias, setCategorias] = React.useState([]);

    const traerCategorias = async() => {
        try{
            const respuesta=await axios.get(rutas.categorias);
            setCategorias(respuesta.data);
        }
        catch(e){
            alert("Error de conexión con la API: "+e.message);
        }
    }

    React.useEffect(() => {
        traerCategorias();
    }, []);

    /*** */
    const guardar = async() => {
        try{
            if(form.nombre==''){
                alert("Este campo no puede ser vacío.")
            }
            else{
                const categoriaNoRepetida=categorias.filter(unaCategoria=>unaCategoria.nombre.toUpperCase()==form.nombre.toUpperCase()).length==0;
                if(categoriaNoRepetida){
                    await axios.post(rutas.categorias, form);
                    props.history.push('/categorias/');
                }
                else{
                    alert("Ese nombre de categoría ya existe.")
                }
            }
        }
        catch(e){
            alert("Error de conexión con la API: "+e.message);
        }
    }

    return (
        <div>
            <label for="Name">Nombre de nueva categoria:</label>
            <input type="text" name="Nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
