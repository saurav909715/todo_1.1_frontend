// import { createContext, useState} from "react";



// export const ContextMaker = createContext(null);

// const Context = (props) => {
//     const [data , setData] = useState(null);

//     return (
//         <ContextMaker.Provider value={{data,setData , name:"saurav"}} >
//             {props.children}
//         </ContextMaker.Provider>
//     )
// }


// export default Context;


import { createContext,useState } from "react";

export const ContextMaker = createContext(null)

const Context = (props) =>{
    const [data,setData] = useState(6)
    return(
        <ContextMaker.Provider value={{data,setData,name:"babajii"}} >
            {props.children}
        </ContextMaker.Provider>
    )
}
export default Context;