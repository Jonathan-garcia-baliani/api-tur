const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para compilar SCSS a CSS
app.use(sassMiddleware({
    src: path.join(__dirname, 'public', 'css'), // Ruta donde se encuentran los archivos SCSS
    dest: path.join(__dirname, 'public', 'css'), // Ruta donde se guardarán los archivos CSS compilados
    debug: true,
    outputStyle: 'compressed', // Opciones: 'expanded' | 'nested' | 'compact' | 'compressed'
    prefix: '/css' // Prefijo de ruta para los archivos CSS compilados
}));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Parser para los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para otros archivos HTML en la carpeta 'html'
app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'public', 'html', `${page}.html`));
});

// Ruta para manejar la adición de productos al carrito
let carrito = [];

app.post('/agregar-al-carrito', (req, res) => {
    const { producto, precio } = req.body;
    carrito.push({ producto, precio: parseFloat(precio) });
    res.sendStatus(200); // Respondemos con éxito al cliente sin redireccionar
});

// Ruta para obtener los detalles del carrito en formato JSON
app.get('/carrito', (req, res) => {
    let total = 0;
    carrito.forEach((item) => {
        total += item.precio;
    });

    // Devolvemos los detalles del carrito en formato JSON
    res.json({ carrito, total });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
