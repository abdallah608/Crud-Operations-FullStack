import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import Typewriter from 'typewriter-effect'
import ParticlesBackground from '../Particles/ParticlesBackground'

export default function Home() {
//--useRef--//
let name = useRef(null)
let price = useRef(null)
let quantity = useRef(null)
let category = useRef(null)
let description = useRef(null)
//---useState--///
  let [products, setProducts] = useState([])

  let [data, setData] = useState({
name:"",
price:"",
quantity:"",
category:"",
description:""
  })

  let [flag, setFlag] = useState(false)

let [sameId,setSameId]=useState(null)
//---getdata---//
   async function getData(){
    await axios.request({
      method:"GET",
      url:"http://localhost:3000"
    })
    .then((response) =>{
      setProducts(response?.data?.data)
    })
    .catch(err=>{
      setProducts(err)
    })
  // console.log(products)
}
///----add data-------///
 function addProducts() {
  
  axios.post("http://localhost:3000/products",data).then(res =>{
    getData()
    clearForm()

  })
}

///---delete--///
function deleteProduct(productId){

  axios.delete(`http://localhost:3000/products/${productId}`).then(res => {
      getData()
})
}

////////////////////

/////--update---///////

function updateProduct(productId,flag){
  setFlag(flag)
  setSameId(productId)
  let currentProduct = products.filter((product)=>(product.id == productId))
  
  let name_ref = name.current
  name_ref.value = currentProduct[0].name
  let price_ref = price.current
  price_ref.value = currentProduct[0].price
  let quantity_ref = quantity.current
  quantity_ref.value = currentProduct[0].quantity
  let category_ref = category.current
  category_ref.value = currentProduct[0].category
  let description_ref = description.current
  description_ref.value = currentProduct[0].description

  setData({ name:currentProduct[0].name,
  price:currentProduct[0].price,
  quantity:currentProduct[0].quantity,
  category: currentProduct[0].category,
  description:currentProduct[0].description})

}

async function updateProductData(){
  let{name, price, category,quantity, description} = data

  let updateProduct = {
      id: sameId,
      name:name,
      price :price,
      quantity:quantity,
      category:category,
      description: description
  }

  await axios.put('http://localhost:3000/products', updateProduct).then(res => {
      getData()
})
setFlag(false)
  clearForm()

}



/////////
function getEnterProduct(e){
  let enterProduct = {...data}
  enterProduct[e.target.name] = e.target.value
  setData(enterProduct)
  console.log(enterProduct);
}
// ////-search--//
// async function search(e) {
//   await axios.request({
//     method:"GET",
//     url:"http://localhost:3000/products"
//   })
//   .then((response) =>{
//     setProducts(response?.data?.data)
//   })
//   .catch(err=>{
//     setProducts(err)
//   })
// }
///-----clear form---///


function clearForm(){
  document.getElementById('productName').value = ''
  document.getElementById('productPrice').value = ''
  document.getElementById('productQuantity').value = ''
  document.getElementById('productCategory').value = ''
  document.getElementById('productDescription').value = ''
  setData({
  productName:"",
  productPrice:"",
  productQuantity:"",
  productCategory:"",
  productDescription:"",
  })
}




//--useEffect--//
useEffect(() => {
  getData()
  
  }, [data,flag])
  

  return (
    <>
          <Helmet>
         <meta charSet="utf-8" />
        <title>Crud</title>
      
      </Helmet>

    <div className="crudPage">
    <ParticlesBackground/>

    <div className=" crudTittle">
      <div className="col-md-12">
      <h1 className='text-danger text-center mt-5'>
            <Typewriter
            options={{
                autoStart:true,
                loop:true,
                delay:100,
                strings:["Crud Operations with Node.js"]


            }}  
            
            
            />

          </h1>
      </div>
    </div>



    <div className="crudInput">
      <div className="col-md-12">


<div className='text-white'>
<div className="form-group mb-3">
  <label className='fw-bold fs-5 mb-2' htmlFor="productName">Product Name</label>
  <input onChange={(e)=>{getEnterProduct(e)}} type="text" ref={name}  id="productName" name='name' className="form-control" />
</div> 
  <div  className="form-group mb-3">
    <label className='fw-bold fs-5 mb-2' htmlFor="productPrice">Product Price </label>
    <input onChange={(e)=>{getEnterProduct(e)}} type="number" ref={price} id="productPrice" name='price' className="form-control" />
  </div>
  <div className="form-group mb-3">
    <label className='fw-bold fs-5 mb-2' htmlFor="productQuantity">Product Quantity</label>
    <input onChange={(e)=>{getEnterProduct(e)}} type="number" ref={quantity} id="productQuantity" name='quantity' className="form-control" />
  </div>
  <div className="form-group mb-3">
    <label className='fw-bold fs-5 mb-2' htmlFor="productCategory">Product Category</label>
    <input onChange={(e)=>{getEnterProduct(e)}} type="text"  ref={category} id="productCategory" name='category' className="form-control" />
  </div>
  <div  className="form-group mb-3">
    <label className='fw-bold fs-5  mb-2' htmlFor="productDescription">Product Description</label>
    <input onChange={(e)=>{getEnterProduct(e)}} type="text" ref={description} id="productDescription" name='description' className="form-control" />
  </div>
  <div className="d-flex flex-column align-items-center">
    
    {flag? <>
  <button className="btn btn-outline-warning w-50" id='update'  onClick={()=>updateProductData()} >update Product</button>
    </>:<>
      <button className="btn btn-outline-success w-50" id='add' onClick={()=>addProducts()} >Add Product</button>
    </>}
  </div>

  </div>


      </div>
    </div>

    {/* <div className="crudSearch"> 
    <div className="col-md-12">
    <div className="form-floating mt-4 mb-2 w-75 mx-auto">
  <input onClick={(e)=>{search(e)}} type="text" className="form-control " id="searchProducts" placeholder="text" />
  <label htmlFor="searchInput">Search Here</label>
</div>

    </div>
    </div> */}

    <div className="crudTable text-white">
    <div className="col-md-12">
    <table className="table text-white">
  <thead id='thead'>
    <tr>
      
       <th>product name</th>
       <th>product price</th>
       <th>product quantity</th>
       <th>product category</th>
        <th>product description</th>
        <th>Update </th>
        <th>Delete</th>

    </tr>
  </thead>
{products?.map((product,id)=>(
   <tbody key={id} >
   <tr>
             
             <td>{product.name}</td>
             <td>{product.price}</td>
             <td>{product.quantity}</td>
             <td>{product.category}</td>
             <td>{product.description}</td>
             <td><button className="btn btn-warning"  onClick={()=>updateProduct(product.id,true)}>Update</button></td>
             <td><button className="btn btn-danger" onClick={()=>deleteProduct(product.id)}>Delete</button></td>
         </tr>
   </tbody>
  
  
  ))}
  </table>
    </div>
    </div>

    </div>

    </>
  )
}
