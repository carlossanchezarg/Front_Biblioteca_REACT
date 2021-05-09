import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import rutas from '../config.json';


export default function EditarLibro(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
        descripcion: '',
        categoria_id:''
    })

    const buscarLibrosPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get(rutas.libros+idLibro)
            setForm(respuesta.data)
        } catch(e) {
            return("Fallo la consulta o el libro no existe.")
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibrosPorId(params.id)
    }, [params])

    
    const handleChangeDescripcion = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }


    /**/

    const guardar = async() => {
        try{
            const nuevaDescripcion={"descripcion":form.descripcion};
            if(form.descripcion==''){
                alert("Debe ingresar una nueva descripcíon.")
            }
            else{
                await axios.put(rutas.libros+params.id, nuevaDescripcion);
                props.history.push('/libros/');
            }
        }catch(e){
            alert("No se pudieron guardar los cambios.Error:"+e.error)
            return({message:e.error});
        }
    }

    return (
        <div>
            <label for="Name">Nombre:</label><input type="text" value={form.nombre} disabled/><br/>
            <label for="Name">Descripción:</label><input type="text" value={form.descripcion} onChange={handleChangeDescripcion}/><br/>
            <label for="Name">Categoria ID:</label><input type="text"  value={"Categoría ID:"+form.categoria_id} disabled/><br/>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
