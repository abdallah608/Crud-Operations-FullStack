import express from "express"
import { addProduct, deleteProduct, getAllProduct, getByID, searchProduct, updateProduct } from "./control/product.controler.js"
const router =express.Router()


//-----start api-----///


//-- start get all data--//
router.get('/', getAllProduct)
// //-- end get all data--//


//--start add new product--//
 router.post('/products',addProduct)
//--end add new product--//



//--- start update--//
router.put('/products', updateProduct)
//--- end update--//



 //-- start delete--//
router.delete('/products/:id',deleteProduct)
//-- end delete--//


//---start get element by id---///
 router.get('/products/:id',getByID)
 //---end get element by id---///


 //---start search----//
 router.get('/products', searchProduct)

 //---end search--//
 
 //-----end api-----///


export default router