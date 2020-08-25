import { 
	    ENTER_IMAGE_URL,
	    REGISTRATION_NAME,
	    REGISTRATION_EMAIL,
	    REGISTRATION_PASSWORD
	   } from './Constants';


export const UserEntersUrl=(text)=>({

   type:ENTER_IMAGE_URL,
   payload:text
})

export const UserEntersName=(text)=>({

	type:REGISTRATION_NAME,
	payload:text
})

export const UserEntersEmail=(text)=>({

	type:REGISTRATION_EMAIL,
	payload:text
})

export const UserEntersPassword=(text)=>({

	type:REGISTRATION_PASSWORD,
	payload:text
})

// export const LoadingUsers=({name,email,password})=>(dispatch)=>{
// 	dispatch({type:LOAD_USERS_PENDING})
// 	fetch('http://localhost:3000/register',{
// 			method:'post',
// 			headers:{'Content-Type':'application/json'},
// 			body:JSON.stringify(

//                                 {   
//                                 	"name":name,
//                                 	"email":email,
//                                 	"password":password
//                                 }
//             	                )
// 		})
// 		  .then(response=>response.json())
// 		  .then(data=>dispatch({type:LOAD_USERS_SUCCESS,payload:data}))
// 		  .catch(error=>dispatch({type:LOAD_USERS_FAILED,payload:error}))

// }

