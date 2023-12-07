import express from "express";
import ProductManager from "./productManager.js";

const PORT = 3000;
const app = express();
const productManager = new ProductManager();



app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto: ${PORT}`);
});

app.get('/products', async (req, res) => {
    try{
        const products = await productManager.consultarProductos();

        const limit = parseInt(req.query.limit)

        if (!isNaN(limit) && limit > 0) {
            const productosFiltrados = products.slice(0, limit);
            res.json({ products: productosFiltrados });
        } else {
            res.json({ products });
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.json({ error: 'Error al obtener productos' });
    }
    
})

app.get('/products/:id', async (req, res) => {
    const idProducto = req.params.id; 
    try {
        const producto = await productManager.getProductById(idProducto);
        if (!producto) {
            return res.json({ error: 'Producto no encontrado' });
        }
        res.json({ producto });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.json({ error: 'Error al obtener producto por ID' });
    }
});

   
   