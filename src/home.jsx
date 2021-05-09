import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
     <div>
     <h1>Administración de Biblioteca</h1>
        
     <div className="home">
         <ul className="homeLista">
            <li>
                <Link to="/libros">Administrar Libros</Link>
            </li>

            <li>
                <Link to="/categorias">Administrar Categorías</Link>
            </li>
            <li>
                <Link to="/personas">Administrar Personas</Link>
            </li>
        </ul>
    </div>
    </div>
    );
}