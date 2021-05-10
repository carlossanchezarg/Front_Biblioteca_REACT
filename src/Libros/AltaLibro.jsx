import React from 'react'
import axios from 'axios';
import rutas from '../config.json'

export default function AltaLibro(props) {


    const [form, setForm] = React.useState({
        nombre: '',
        descripcion: '',
        categoria_id: ''
    })



    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeDescripcion = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeCategoria = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.categoria_id = e.target.value;
        setForm(nuevoState);
    }



    /**Consulto libros para validar que el nombre no se encuentre repitido, este campo tiene que ser único***/
    const [listaLibros, setListado] = React.useState([]);
    const [error, setError] = React.useState('');
     
    const consultaLibros = async() => {
        try {
            const respuesta = await axios.get(rutas.libros);
            setListado(respuesta.data);
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

    /*****/

    const guardar = async() => {
        try{
            if(form.nombre==''||form.descripcion==''||form.categoria_id=='')
            {
                alert("Ninguno de los campos puede ser vacío.")
            }
            else{
                const libroNoRepetido=listaLibros.filter(unLibro=>unLibro.nombre.toUpperCase()==form.nombre.toUpperCase()).length==0;
                if(libroNoRepetido){
                    await axios.post(rutas.libros, form);
                    props.history.push('/libros/');
               }
               else{
                   alert("El nombre de ese libro ya se ecuentra resgistrado.")
               }
            }
        }
        catch(e){
            alert("Error de conexión con la API: "+e.message);
        }
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



    return (
        <div>
            <label for="Name">Nombre:</label><input type="text" name="Nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <label for="Name">Descripción:</label><input type="text" name="Descripción" placeholder="descripción" value={form.apellido} onChange={handleChangeDescripcion}/><br/>
            <select name="Categoría" onChange={handleChangeCategoria}>
                <option value="">Seleccione una categoría</option>
                {categorias.map(categoria => (
                    <option value={categoria.id}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
