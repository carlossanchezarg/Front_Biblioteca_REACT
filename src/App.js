import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import AltaPersona from './Personas/AltaPersona';
import EditarPersona from './Personas/EditarPersona';
import ListadoPersonas from './Personas/ListadoPersonas';
import LibrosPrestados from './Personas/LibrosPrestados';
import ListadoLibros from './Libros/ListadoLibros';
import AltaLibro from './Libros/AltaLibro';
import EditarLibro from './Libros/EditarLibro';
import PrestarLibro from './Libros/PrestarLibro';
import ListadoCategoria from './Categorias/ListadoCategoria';
import AltaCategoria from './Categorias/AltaCategoria';
import LibrosCategoria from './Categorias/LibrosCategoria';



function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/personas/" component={ListadoPersonas} />
        <Route exact path="/personas/editar/:id" component={EditarPersona} />
        <Route exact path="/personas/agregar/" component={AltaPersona}/>
        <Route exact path="/personas/libros_prestados/:id" component={LibrosPrestados}/>
        <Route exact path="/libros/" component={ListadoLibros}/>
        <Route exact path="/libros/agregar/" component={AltaLibro}/>
        <Route exact path="/libros/editar/:id" component={EditarLibro}/>
        <Route exact path="/libros/prestar/:id" component={PrestarLibro}/>
        <Route exact path="/categorias/" component={ListadoCategoria}/>
        <Route exact path="/categorias/agregar/" component={AltaCategoria}/>
        <Route exact path="/categorias/libros/:id" component={LibrosCategoria}/>
      </Router>
    </div>
  );
}

export default App;
