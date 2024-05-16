export const LOADING = "loading" 
export const SUCCESS = "success"
export const ERROR = "error"
export const ASC = "price/ascending"
export const DESC = "price/descending" 
export const ALL = "allCategoryData"
export const CATEGORY = "item/category"
export const TITLE = "coffee/title"
export const PL100 = "price<100"
export const P100T200 = "price100-200"
export const P200T300 = "price200-300" 
export const P300T400 = "price300-400"
export const P400T500 = "price400-500"
export const P500T600 = "price500-600"
export const PG600 = "price>600"

export const priceTypeL100 = (data)=>{
    return { type : PL100 , payload : data} ;
}
export const priceType100T200 = (data)=>{
    return { type : P100T200 , payload : data} ;
}
export const priceType200T300 = (data)=>{
    return { type : P200T300 , payload : data} ;
}
export const priceType300T400 = (data)=>{
    return { type : P300T400 , payload : data} ;
}
export const priceType400T500 = (data)=>{
    return { type : P400T500 , payload : data} ;
}
export const priceType500T600 = (data)=>{
    return { type : P500T600 , payload : data} ;
}
export const priceTypeG600 = (data)=>{
    return { type : PG600 , payload : data} ;
}

export const loadingType = ()=>{
    return { type : LOADING } ;
}

export const allType = (data)=>{
    return { type : ALL , payload : data } ;
}

export const ascendingType = (data) => {
    return { type : ASC , payload : data } ;
}

export const descendingType = (data)=>{
    return { type : DESC , payload : data } ;
}

export const errorType = ()=>{
    return { type : ERROR } ;
}

export const categoryType = (data)=>{
    return { type : CATEGORY , payload : data } ;
}

export const titleType = (data,title)=>{
    return { type : TITLE , payload : {data,title}} ;
}

export const fetchData = ({ asc , desc, all, category, title , price})=> async (dispatch)=>{
  
     try 
     {      if(category){
                 dispatch(categoryType(dataArr)) ;
             }
           
           dispatch(loadingType()) ;

           let res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee`) ;
           let dataArr = await res.json() ;
           dataArr = dataArr.data ;
        //    console.log(dataArr) ;
      

        if(asc==true)
             dispatch(ascendingType(dataArr)) ;
           else 
             if(desc==true)
               dispatch(descendingType(dataArr)) ;
             else 
                if(all==true)
                   dispatch(allType(dataArr)) ;
                else
                  if(title!=""){
                    dispatch(titleType(dataArr, title)) ;
                   }
                   else if(price=='<100')
                            dispatch(priceTypeL100(dataArr)) ;
                        else if(price=="100-200")
                               dispatch(priceType100T200(dataArr)) ;
                             else if(price=="200-300")
                                      dispatch(priceType200T300(dataArr)) ;
                                  else if(price=="300-400")
                                          dispatch(priceType300T400(dataArr)) ;
                                        else if(price=="400-500")
                                                 dispatch(priceType400T500(dataArr)) ;
                                             else if(price=="500-600")
                                                      dispatch(priceType500T600(dataArr)) ;
                                                   else if(price==">600")
                                                           dispatch(priceTypeG600(dataArr)) ;
    }
    catch(err){
        console.log(err) ;
           dispatch(errorType()) ;
    }

}


export const ADD = "cart/add"
export const REMOVE = "cart/remove" 
export const SHOWCARTDATA = "cart/items" ;


export const showCartType = ()=>{
    return { type : SHOWCARTDATA } ;
}

export const addTypeCart = (obj)=>{
    // console.log({ type : ADD , payload : obj}) ;
    return { type : ADD , payload : obj }
}

export const removeTypeCart = (obj)=>{
    // console.log({type : REMOVE , payload : obj}) ;
    return { type : REMOVE , payload : obj} 
}

export const TOTAL = "cart/totalprice" ;
export const CLEAR = "cart/empty" ;

export const totalPriceType = ()=>{
    return { type : TOTAL } ;
}

export const clearCartType= ()=>{
    return { type : CLEAR} ;
}