//-----general---//
//--server---//
import express, { json } from 'express'
const app = express()
const port = 3000
//---cors---//
import cors from 'cors'

//-----middleware---//
app.use(json())
app.use(cors())
//---productRouters---//
import productRouters from "./src/modules/Products/Products.routers.js"
app.use(productRouters)

//----end general---//

//----server running----//
app.listen(port, () => console.log(`server running in port ${port}!`))