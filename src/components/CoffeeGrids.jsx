import React, { useContext, useEffect, useState } from 'react'
import {Box , Heading, Button , GridItem , Grid , Img  } from '@chakra-ui/react'
import { useDispatch , useSelector } from 'react-redux'
import { addTypeCart, clearCartType, fetchData, removeTypeCart, showCartType, totalPriceType } from '../store/actionTypes';
import { AuthContext } from '../contexts/AuthContext';
import '../../src/index.css' ;

export const CoffeeGrids = () => {
  
    let { showCart, setShowCart } = useContext(AuthContext) ;

    let data = useSelector(state=>state.coffee) ;
    let dispatch = useDispatch() ;
    let cartData = useSelector(state=>state.cart) ;
    let totalPriceItems = useSelector(state=>state.total) ;
    // console.log(cartData.data) ;

    function handleClick(){
      setShowCart(false) ;
        dispatch(fetchData({ asc : false , desc : false , all : true, category : false, title : ""})) ;   
    }

    function sendObjFunCart(obj){
      // console.log(obj) ;
      let obj2 = {...obj , quantity : 1 } ;
      // console.log(obj2) ;
      dispatch(addTypeCart(obj2)) ;
      dispatch(totalPriceType()) ;
    }

    function removeObjFunCart(obj){
      // console.log("minus obj " , obj)
      dispatch(removeTypeCart(obj)) ;
      dispatch(totalPriceType()) ;
    }

    function handlePayment(){
      setShowCart(false) ;
      dispatch(clearCartType()) ;
      alert("Payment Successfull....redirected to main page!!!") ;
      dispatch(showCartType()) ;
    }

  return (
    <Box width={'fit-content'}  margin={'auto'}>
      
        <Heading as={'h1'}>Coffee</Heading>
        <br/>
         <Button border={'none'} bg={'lightcoral'} color={'white'} padding={16} borderRadius={5}  onClick={()=>{handleClick()}} >All types of Coffee</Button>
        <br/><br/><br/><br/><br/><br/>

        { data.isLoading && <Heading as={'h1'}>Loading...</Heading>}
        { data.isError && !data.isLoading && <Heading as={'h1'}>Error while fetching data...</Heading>}
        { !showCart && 
             <>
        <div 
         className='gridBoxShow'>
 
          { !data.isLoading && !data.isError && data?.data.map(item=>{
            return (
                <Box key={item.id} width={'fit-content'} boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px" paddingLeft={20} paddingTop={20} borderRadius={10} paddingRight={'20'}> 
                   <Img src={item.image} width={250} height={200} alt={`${item.title}`} />
                   <Heading as={'h2'}>{item.title}</Heading>
                   <Heading as={'h3'}>INR {item.price}</Heading>
                   <br/>
                   
                   <Button textAlign={'center'} bg={'lightblue'} color={'white'} fontWeight={600}  padding={12} borderRadius={5} border={'none'} onClick={()=>sendObjFunCart(item)}>Add To Cart</Button>
                   <br/>
                   
                   <p style={{width:"60%"}}>{item.description}</p>
                   <ul>
                       {
                        item?.ingredients.map(ele=> <li key={`${item.title}/${ele}`}>{ele}</li> )
                       }
                   </ul>
                  
                </Box>
            )
          }) }

        </div>
        </> }
        {
          showCart && <>
             <Box width={'fit-content'}>
                   
                   <Heading as={'h1'} color={'gray'}>Cart Items </Heading>
                   <Box>
                    {
                      cartData.data?.map(items => {
                        return (

                          <Box display={'flex'} border={'1px solid greay'} boxShadow= "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" padding={50} marginTop={10} marginBottom={20} key={items.id}>
                             
                               <Img src={items.image} width={150} height={150} alt={items.image}/>
                               <Box>
                               <Heading color={'brown'} paddingLeft={30} as={'h2'}>{items.title}</Heading>
                               <Heading color={'yellowgreen'} paddingLeft={30} as={'h4'}>INR {items.price}</Heading>
                              
                               <Button onClick={()=>sendObjFunCart(items)} border={'none'} marginLeft={30} marginRight={20} bg={'rgb(228,202,162)'} padding={5} borderRadius={5}>➕</Button>  
                               <span style={{fontSize:"20px", color:'lightsteelblue', fontWeight:"600"}}> {items.quantity} </span>
                               <Button onClick={()=>removeObjFunCart(items)} border={'none'} marginLeft={20} bg={'rgb(228,181,171)'} padding={5} borderRadius={5}>➖</Button>
                               </Box>
                               
                          </Box>
                        )
                      })
                    }
                    <br/>
                    { cartData.data?.length>0 && <Button marginBottom={20} marginTop={20} marginLeft={"24%"}  padding={18} borderRadius={12} borderTop={'3px solid lightblue'} borderBottom={'3px solid lightblue'} borderLeft={'none'} borderRight={'none'} bg={'lightskyblue'} color={'white'} fontSize={18}>Total Amount : INR {totalPriceItems.data}</Button>}
                    <br/>
                    { cartData.data?.length>0 && <Button marginLeft={"25%"} padding={18} borderRadius={12} border={'none'} bg={'green'} color={'white'} fontSize={18} onClick={()=>handlePayment()}>Checkout for Payment</Button>}
                    {  cartData.data?.length==0 && <Heading as={'h3'} color={'red'}><br/><br/> Cart is Empty !!! </Heading>}
                   </Box>
             </Box>
             
          </>
        }
    </Box>
  )
}
