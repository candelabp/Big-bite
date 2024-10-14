import '../css/adminProductos.css';
export const AdminProductos = () => {
    return(
       <div className='contenedor-ppal-titulo'>
        <h1>Gestiona tus productos</h1>
        <p>Agregue, actualice o elimine facilmente productos de la carta</p>
        <div className='botones'>
        <button className="btn-edit" >Editar un producto existente</button>
        <button className='btn-create'>Crear un nuevo producto</button>
        </div>
         </div>
    );
}