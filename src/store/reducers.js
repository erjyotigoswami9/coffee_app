import { ADD, ALL, ASC, CATEGORY, CLEAR, DESC, ERROR, LOADING, P100T200, P200T300, P300T400, P400T500, P500T600  , PG600, PL100, REMOVE, SHOWCARTDATA, SUCCESS, TITLE, TOTAL } from "./actionTypes";

const initState = {data: [], isLoading : false , isError : false}

export const data_coffee_fetch_Reducer = (state=initState, action)=>{
    switch(action.type){
        case LOADING : return {...state, isLoading : true , isError : false } ;
        case ALL : return {data: action.payload, isLoading : false , isError : false} ;
        case ASC : 
                      let ascData =  [...action.payload] ;
                      for(let i=0;i<ascData.length;i++){
                        for(let j=0;j<ascData.length;j++){
                            if(ascData[i].price<ascData[j].price){
                                let temp = ascData[i] ;
                                ascData[i] = ascData[j] ;
                                ascData[j] = temp ;
                            }
                        }
                      }
                      console.log(ascData) ;
                      return { data : ascData , isLoading : false , isError : false } ;
        case DESC :   
                      let descData = [ ...action.payload ] ;
                      for(let i=0;i<descData.length ; i++){
                        for(let j=0; j<descData.length;j++){
                            if(descData[i].price>descData[j].price){
                                let temp = descData[i] ;
                                descData[i] = descData[j] ;
                                descData[j] = temp ;
                                // console.log(descData) ;
                            }
                        }
                      }
                      console.log(descData) ;
                      return { data : descData , isLoading : false , isError : false } ;
        case ERROR : return { ...state , isLoading : false , isError : true } ; 
        case CATEGORY : 
                       let dataTitles = [...action.payload] ;
                       dataTitles = dataTitles.map(ele=>ele.title) ;
                       return { data : dataTitles , isLoading : false , isError : false} ;
        case TITLE : 
                     let titleArr = [...action.payload.data] ;
                     titleArr = titleArr.filter(ele=>ele.title==action.payload.title) ;
                     return { data : titleArr , isLoading:false , isError : false} ;
        case PL100 : 
                      let priceArr = [...action.payload] ;
                      priceArr = priceArr.filter(ele=>Number(ele.price)<100) ;
                      return { data : priceArr , isLoading : false , isError : false } ;
        case P100T200 :
                       let priceArr100T200 = [...action.payload] ;
                       priceArr100T200 = priceArr100T200.filter(ele=>Number(ele.price)>=100 && Number(ele.price)<200) ;
                       return { data : priceArr100T200 , isLoading : false , isError : false } ;
        case P200T300 :
                        let priceArr200T300 = [...action.payload] ;
                        priceArr200T300 = priceArr200T300.filter(ele=>Number(ele.price)>=200 && Number(ele.price)<300) ;
                        return { data : priceArr200T300 , isLoading : false , isError : false } ;
        case P300T400 :
                        let priceArr300T400 = [...action.payload] ;
                        priceArr300T400 = priceArr300T400.filter(ele=>Number(ele.price)>=300 && Number(ele.price)<400) ;
                        return { data : priceArr300T400 , isLoading : false , isError : false } ;
        case P400T500 :
                        let priceArr400T500 = [...action.payload] ;
                        priceArr400T500 = priceArr400T500.filter(ele=>Number(ele.price)>=400 && Number(ele.price)<500) ;
                        return { data : priceArr400T500 , isLoading : false , isError : false } ;    
       
        case P500T600 : 
                         let price500T600 = [...action.payload] ;
                         price500T600 = price500T600.filter(ele=>{
                            return ele.price>=500 && ele.price<600
                         })
                         return { data : price500T600 , isLoading : false , isError : false } ;

        case PG600 :   
                        let priceG600 = [...action.payload] ;   
                        priceG600 = priceG600.filter(ele=>Number(ele.price)>=600) ;
                        return { data : priceG600 , isLoading : false , isError : false } ;
        default : return state ;
    }
}



export const cartReducer = (state={} , action)=>{
    switch(action.type){

        case SHOWCARTDATA : 
                             let data4 = JSON.parse(localStorage.getItem("cartArray")) || [] ;
                             return { data : data4} ;
        case ADD :   
                     let obj2 = action.payload ;
                    //  console.log(obj2) ;
                     let data3 ;
                     let data2 = JSON.parse(localStorage.getItem("cartArray"))|| [] ;
                     if(data2.length==0){
                        data3 = [obj2] ;
                        localStorage.setItem("cartArray",JSON.stringify(data3)) ;
                     }
                     else{
                        let flag = false ;
                         for(let i=0;i<data2.length;i++)
                          if(obj2.id==data2[i].id){
                            data2[i].quantity= data2[i].quantity + 1 ;
                            flag = true ;
                            break ;
                          }
                         
                          if(flag==false){
                            data3 = [obj2, ...data2] ;
                          }
                          else {
                            data3 = [...data2] ;
                          }
                          localStorage.setItem("cartArray",JSON.stringify(data3)) ;
                     }
                     return { data : data3 } ;
        
        case REMOVE : 
                        // console.log("remove reducer ", action.payload) ;
                        let obj3 = {...action.payload} ;
                        let data5 = JSON.parse(localStorage.getItem("cartArray"))||[] ;
                        // console.log("data5 from local storage : ",data5) ;
                        for(let i=0;i<data5.length;i++){
                            if(data5[i].id==obj3.id){
                                data5[i].quantity = data5[i].quantity - 1 ;

                                // remove complete item if quantity gets equal to 0

                                if(data5[i].quantity==0){
                                    let newArr = [...data5.slice(0,i),...data5.slice(i+1)] ;
                                    localStorage.setItem("cartArray", JSON.stringify(newArr)) ;
                                    return { data : newArr } ;
                                }
                            }
                        }
                        localStorage.setItem("cartArray", JSON.stringify(data5)) ;
                        return { data : data5 } ;
       
                          
        default : return state ;
    }
}

export const totalPriceReducer = (state=0, action)=>{
    switch(action.type){
        case TOTAL : 
                     let data6 = JSON.parse(localStorage.getItem("cartArray"))|| [] ;
                     if(data6.length==0){
                        return { data : 0 } ;
                     }
                     if(data6.length>0){
                        let price_total_items = 0 ;
                        for(let i=0;i<data6.length;i++){
                            price_total_items += data6[i].price*data6[i].quantity ;
                        }
                        return { data : price_total_items } ;
                     }
        case CLEAR : 
                      localStorage.setItem("cartArray",JSON.stringify([])) ;
                      return { data : 0 } ;
        default : return state 
    }
}