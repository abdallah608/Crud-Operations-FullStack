import { query } from "../../../../DataBase/connection.js"


//-- start get all data--//
export const getAllProduct= (req, res) =>{
    query.execute(" select * from products",(err,data)=>{   
        res.json({message:"success",data})
    })
}
//-- end get all data--//


//--start add new product--//

export const addProduct = (req,res)=>{
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

 }
//--end add new product--//

//--- start update--//

 export const updateProduct =(req,res)=>{
    let{id,name ,price ,quantity,category,description}=req.body
    query.execute(`update products set name="${name}" , price="${price}",quantity=${quantity},category="${category}",description="${description}"  where id =${id}`,(err,data)=>{
        if(data && data.affectedRows==0){

            res.json({message:"Product notfound",data})
        }else{
            res.json({message:"success",data})
        }
    })
}
//--- end update--//

 //-- start delete--//

export const deleteProduct =(req,res)=>{
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
}
 //-- end delete--//


//---start get element by id---///

export const getByID= (req, res) =>{
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
}

//---end get element by id---///

 //---start search----//

export const searchProduct =(req, res) =>{
    let{name}=req.body
    query.execute(` select * from products where name like'%${name}%'`,(err,data)=>{   
       if(data!=0){
        res.json({message:"success",data})
       }else{
        res.json({message:"notfound",})
       }
    })
}

 //---end search----//
