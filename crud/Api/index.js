//-----general---//

//--server---//
const express = require('express')
const app = express()
const port = 3000


//---database---/
const mysql2 = require("mysql2")
const query = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"shopping"
})


//---cors---//
const cors = require('cors')


//-----middleware---//
app.use(express.json())
app.use(cors())

//----end general---//


//-----start api-----///


//-- start get all data--//
app.get('/', (req, res) =>{
    query.execute(" select * from products",(err,data)=>{   
        res.json({message:"success",data})
    })
})
//-- end get all data--//


//--start add new product--//
 app.post('/products',(req,res)=>{
    let {name ,price ,quantity,category,description}=req.body
    console.log(req.body);
    query.execute(" select name from products",(err,data)=>{   
        
        let check = data.find((product)=>{
        return product.name == name  
        })

        if(check){
          return res.json({message:"Existing product"})    
        }else{
            
        query.execute(`insert into products(name , price , quantity,category,description) values('${name}','${price}',${quantity},'${category}','${description} ')`,(err,data)=>{
        res.json({message:"success",data})
    })
        }
    })

 })
//--end add new product--//



//--- start update--//
app.put('/products',(req,res)=>{
    let{id,name ,price ,quantity,category,description}=req.body
    query.execute(`update products set name="${name}" , price="${price}",quantity=${quantity},category="${category}",description="${description}"  where id =${id}`,(err,data)=>{
        if(data && data.affectedRows==0){

            res.json({message:"Product notfound",data})
        }else{
            res.json({message:"success",data})
        }
    })
})
//--- end update--//



 //-- start delete--//
app.delete('/products/:id',(req,res)=>{
    let{id}=req.params
    query.execute(` delete from products where id=${id}`,(err,data)=>{
        if(err){
            res.json({message:"error",err})
           }
        if(data && data.affectedRows==0){
            res.json({message:"Product notfound",data})
        }else{
            res.json({message:"success",data})
        }
    })
})
//-- end delete--//


//---start get element by id---///
 app.get('/products/:id', (req, res) =>{
    let{id}=req.params
    query.execute(`select * from products where id=${id}`,(err,data)=>{   
       if(err){
        res.json({message:"error",err})
       }
       if(data==0){
           res.json({message:"ID notfound"})
    }else{
        res.json({message:"success",data})
       }
    })
})
 //---end get element by id---///


 //---start search----//
 app.get('/products', (req, res) =>{
    let{name}=req.body
    query.execute(` select * from products where name like'%${name}%'`,(err,data)=>{   
       if(data!=0){
        res.json({message:"success",data})
       }else{
        res.json({message:"notfound",})
       }
    })
})

 //---end search--//
 
 //-----end api-----///



//----server running----//
app.listen(port, () => console.log(`server running in port ${port}!`))