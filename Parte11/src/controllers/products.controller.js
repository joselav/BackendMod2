import {productsModel} from '../models/products.models.js'

export const getProds = async(req,res) =>{

    const {limit, page, filter, sort} = req.query;
    const pag = page ? page : 1; //(Si se consulta por la página, devuelve la página, sino la pág 1)
    const lim = limit ? limit : 10;
    const asc = sort == 'asc' ? 1 : -1;

    try{
        const prods = await productsModel.paginate({filter: filter}, {limit: lim, page: pag, sort:{price: asc}})

        if(prods){
            return res.status(200).send(products)
        }

        res.status(404).send({error: 'Productos no encontrados.'})

    }catch(error){
        res.status(500).send({error:`Error al consultar los productos ${error}`})
    }

}



export const getProdById = async(req,res) =>{
    const {id} = req.params;

    try{
        const prod = await productsModel.findById(id)

        if(prod){
            return res.status(200).send(product)
        }

        res.status(404).send({error: 'Producto no encontrado.'})

    }catch(error){
        res.status(500).send({error:`Error al consultar el producto ${error}`})
    }

}


export const postProd = async(req,res) =>{
    const {title, description, price, code, stock, category} = req.body;

    try{
        const prod = await productsModel.create({title, description, price, code, stock, category})

        if(prod){
            return res.status(201).send(product) //201 en método HTTP = created.
        }

        res.status(400).send({error: `Error al crear producto.`})

    }catch(error){
        //En Mongoose el código 11000 es que la llave esta duplicada (en este caso el producto).
        if(error.code == 11000){
            res.status(404).send({error: 'Producto ya creado con llave duplicada'})
        }

        res.status(500).send({error:`Error al crear producto ${error}`})
    }

}

export const putProd = async(req,res) =>{
    const {pid} = req.params;
    const {title, description, price, code, stock, category}= req.body;

    try{
        const prod = await productsModel.findByIdAndUpdate(pid, {title, description, price, code, stock, category})

        if(prod){
            return res.status(200).send(product) 
        }

        res.status(404).send({error: `Error al actualizar producto.`})

    }catch(error){
        res.status(500).send({error:`Error al actualizar producto ${error}`})
    }

}

export const deleteProd = async(req,res) =>{
    const {pid} = req.params;

    try{
        const prod = await productsModel.findByIdAndDelete(pid);

        if(prod){
            return res.status(200).send(product) 
        }

        res.status(404).send({error: `Error al eliminar producto.`})

    }catch(error){
        res.status(500).send({error:`Error en eliminar producto ${error}`})
    }
}