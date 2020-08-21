import { 
	    REGISTRATION_NAME,
	    REGISTRATION_EMAIL,
	    REGISTRATION_PASSWORD
       } from './RegisterConstants';


const initialState={
	name:'',
	email:'',
	password:''
}


export const onRegistration=(state=initialState, action={})=>{
	switch(action.type){
		case REGISTRATION_NAME:
		return Object.assign({},state,{name:action.payload})
		case REGISTRATION_EMAIL:
		return Object.assign({},state,{email:action.payload})
		case REGISTRATION_PASSWORD:
		return Object.assign({},state,{password:action.payload})

		default:
		return state;
	}
}
