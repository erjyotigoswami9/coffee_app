import React, { useContext, useEffect, useState } from 'react'
import {Box , Button , Select , Img} from '@chakra-ui/react'
import { useDispatch , useSelector } from 'react-redux' 
import { fetchData, showCartType, totalPriceType } from '../store/actionTypes';
import { AuthContext } from '../contexts/AuthContext';

export const Sidebar = () => {
   
  let [count, setCount] = useState(0) ;
  useEffect(()=>{
     let countArr = JSON.parse(localStorage.getItem("cartArray"))|| [] ;
    //  console.log("arr" ,countArr) ;
    //  console.log("count length ", countArr.length) ;
     setCount(countArr.length) ;
    //  console.log(count) ;
  },[])

  // useEffect(()=>{
  //   console.log("cart number is ", count) ;
  // },[count])

  let { showCart, setShowCart } = useContext(AuthContext) ;
  let dispatch = useDispatch() ;
  let titleArr = useSelector(state=>state.coffee) ;
  let cartNumber = useSelector(state=>state.cart) ;
  let priceTotalItems = useSelector(state=>state.total) ;

  let [dataTitleArr, setDataTitleArr] = useState([]) ; 
  useEffect(()=>{
    fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee")
    .then(res=>res.json())
    .then(res=>{
       let a2 = (res.data).map(ele=>ele.title) ;
       setDataTitleArr(a2) ;
    })
  },[])

  function ascClick(){
    setShowCart(false) ;
    dispatch(fetchData({asc : true , desc : false , all : false , category : false , title : ""})) ;
  }
  function descClick(){
    setShowCart(false) ;
    dispatch(fetchData({ asc : false , desc : true , all : false, category : false , title : "" })) ;
  }

  function handleChangeCoffee(e,title2){
    setShowCart(false) ;
    e.target.value="Coffee Category" ;
    console.log(title2) ;
    dispatch(fetchData({ asc : false , desc : false , all : false, category : false , title : title2 })) ;
  }
  function handleChangePrice(e,price2){
    setShowCart(false) ;
    // console.log(price2) ;
    e.target.value="Price Range" ;
    dispatch(fetchData({ asc : false , desc : false , all : false , category : false , title : "" , price : price2})) ;
  }
  function cartClick(){
    //
    setShowCart(true) ;
    dispatch(totalPriceType()) ;
    dispatch(showCartType()) ;
  }
  return (
    <Box width={'fit-content'} padding={20} paddingLeft={10} paddingRight={10} marginLeft={30} marginRight={10} border={'1px solid white'}>
        
         <br/>
        <Button border={'none'} bg={'none'} onClick={()=>cartClick()}>
          <Img width={70} height={50} src={'data:image/png;base64,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'} alt='cart' />
          <span style={{ marginTop:"-20px", marginLeft:"-5px"}}><sup style={{fontSize:"30px" , color:"red"}} >{cartNumber.data?.length} </sup></span>
       
        </Button>
        <br/><br/><br/>
        <br/><br/><br/>
        <Button border={'none'} bg={'lightcoral'} color={'white'} padding={16} borderRadius={5} onClick={()=>ascClick()}>Price Low to High</Button>
        <br/><br/>
        <Button border={'none'} bg={'lightcoral'} color={'white'} padding={16} borderRadius={5} onClick={()=>descClick()}>Price High to Low</Button>
        <br/><br/>

        <Select onChange={(e)=>handleChangeCoffee(e,e.target.value)} border={'none'} outline={'none'} backgroundColor={'lightgray'} color={'white'} fontSize={20} textAlign={'center'}>
            <option style={{backgroundColor:"black" , color: "white", fontSize:"17px"  , textAlign : "center"}}>Coffee Category</option>
            {
              dataTitleArr?.map(ele=><option key={ele} value={ele} style={{backgroundColor:"brown" , color:"whitesmoke", padding :"8px", textAlign:"center"}}>{ele}</option>)
            }
        </Select>
        <br/><br/>
        <Select onChange={(e)=>handleChangePrice(e,e.target.value)} border={'none'} outline={'none'} backgroundColor={'lightblue'} color={'blue'} fontSize={20} textAlign={'center'}>
          <option style={{backgroundColor:'aqua' , color:"white", padding :"8px", textAlign:"center"}}>Price Range</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'<100'}>below  INR 100</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'100-200'}>INR 100 - INR 200</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'200-300'}>INR 200 - INR 300</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'300-400'}>INR 300 - INR 400</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'400-500'}>INR 400 - INR 500</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'500-600'}>INR 500 - INR 600</option>
          <option style={{backgroundColor:"lightskyblue" , color:"white", padding :"8px", textAlign:"center"}} value={'>600'}>above INR 600</option>
        </Select>
        <br/>
        
    </Box>
  )
}
