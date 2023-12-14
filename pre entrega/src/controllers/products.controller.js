const { Router } = require('express')

const router = Router()

const products = []

router.get('/', (req, res) =>{
    res.json({message: products})
})

router.get('/',  (req, res) => {
    
        const products =  productManager.consultarProductos();

        const limit = parseInt(req.query.limit)

        if (!isNaN(limit) && limit > 0) {
            const productosFiltrados = products.slice(0, limit);
           return res.json({ products: productosFiltrados });
        } 

        res.json({ products });
})

router.get('/:pid', (req, res) =>{
    const { pid } = req.params

    const product = products.find(product => product.id === Number(pid))
    if(!product) return res.status(404).json({error: 'Product not found'})
    res.json({message: product})
})

router.post('/', (req, res) =>{
    const { id, title, description, code, price, status, stock, category, thumbnails} = req.body

    if( !title || !description || !code || !price  || !stock || !category) return res.status(400).json({ error: 'Todos los campos son obligatorios, en exepcion de thumbnails' });

    const newProducts = {
        id: products.length + 1,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails
    }

    products.push(newProducts)

    res.status(201).json({message: 'Product created'})
})

router.put('/:pid', (req, res) => {
    const { pid } = req.params
    const {title, description, code, price, stock, category} = req.body

    const productUpdateIndex = products.findIndex(product => product.id === Number(pid))

    if(productUpdateIndex === -1) return res.status(404).json({error: "Product not found"})


    const productToUpdate = products[productUpdateIndex];

    productToUpdate.title = title;
    productToUpdate.description = description;
    productToUpdate.code = code;
    productToUpdate.price = price;
    productToUpdate.stock = stock;
    productToUpdate.category = category;
    

    res.json({message: 'Product update'})

} )
router.delete('/:pid', (req, res) => {
    const { pid } = req.params
    
    const productIndex = products.findIndex(product => product.id === Number(pid))

    if(productIndex === -1) return res.status(404).json({error: "Product not found"})

   products.splice(productIndex, 1)

    res.json({message: 'Product deleted'})

} )

module.exports = router