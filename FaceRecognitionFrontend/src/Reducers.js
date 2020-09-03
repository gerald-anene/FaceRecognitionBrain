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


const intialStateInput={
   input:''
}

const initialState={
	RegName:'',
	RegEmail:'',
	RegPassword:''
}

const initialStateUser={
	User:[],
	isPending:false,
	error:'',
	Url:''
}


export const onEnterImageUrl=(state=intialStateInput,action={})=>{

	switch(action.type){
		case ENTER_IMAGE_URL:
		return Object.assign({},state,{input:action.payload});

		default:
		return state;
	}

}


export const onRegistration=(state=initialState, action={})=>{
	switch(action.type){
		case REGISTRATION_NAME:
		return Object.assign({},state,{RegName:action.payload})
		case REGISTRATION_EMAIL:
		return Object.assign({},state,{RegEmail:action.payload})
		case REGISTRATION_PASSWORD:
		return Object.assign({},state,{RegPassword:action.payload})

		default:
		return state;
	}
}

export const LoadUser=(state=initialStateUser, action={})=>{
	switch(action.type){
		case REGISTERED_USER_PENDING:
		return Object.assign({},state,{isPending:true})
		case REGISTERED_USER_SUCCESS:
		return Object.assign({},state,{User:action.payload, isPending:false})
		case REGISTERED_USER_FAILED:
		return Object.assign({},state,{error:action.payload, isPending:false})
		case UPDATE_USER:
		return Object.assign({},state,{User:action.payload})
		case IMAGE_URL:
		return Object.assign({},state,{Url:action.payload})
		default:
		return state
	}
}




