import { 
	    ENTER_IMAGE_URL,
	    REGISTRATION_NAME,
	    REGISTRATION_EMAIL,
	    REGISTRATION_PASSWORD,
	    REGISTERED_USER_PENDING,
	    REGISTERED_USER_SUCCESS,
	    REGISTERED_USER_FAILED,
	    UPDATE_USER,
	    IMAGE_URL
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

export const LoadRegisterdUser=(User)=>(dispatch)=>{

     dispatch({type:REGISTERED_USER_PENDING});
     fetch('http://localhost:3000/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(

                                {   
                                	"name":User.name,
                                	"email":User.email,
                                	"password":User.password
                                }
            	                )
		})
		.then(response=>response.json())
		.then(data=>dispatch({type:REGISTERED_USER_SUCCESS, payload:data}))
		.catch(error=>dispatch({type:REGISTERED_USER_FAILED,payload:error}))
}

export const UpdateSignedInUser=(user)=>({
	type:UPDATE_USER,
	payload:user
})

export const UpdateImageUrl=(url)=>({
	type:IMAGE_URL,
	payload:url
})
