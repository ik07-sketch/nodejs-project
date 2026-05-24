const { log } = require('console')
const express = require('express')
const app = express()
const fs = require('fs')
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
const PORT= 3000
// middleware
app.use(express.json())
//
app.get('/', (req, res) => {
    res.send('server running')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')

})
app.get('/api/v1/products/:id', (req, res) => {
    console.log(req.params);
    const {id} = req.params
const singleproduct = products.find(product => product.id === Number(id))
if (!singleproduct) {
    return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
    });
}

    res.status(200).json({
        status: 'success',
        data: {
            singleproduct
        }
    });
    
});

        //const { id } = req.params
   // const product = products.find(p => p.id === id)
app.post('/api/v1/products', (req, res) => {
        console.log(req.body);
        const body = req.body;
        const newId = products.at(-1).id + 1;
        const newProduct ={id: newId, ...body}
        products.push(newProduct)
        fs.writeFileSync('./data/products.json', JSON.stringify(products))
        if(err){
            return res.status(500).json({
                status: 'error',
                message: 'Failed to save product'
            });
        }

        res.status(201).json({
            status: 'success',
            data: {
                product: 'new product'
            }
        });
    });