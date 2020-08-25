import { 
	    ENTER_IMAGE_URL,
	    REGISTRATION_NAME,
	    REGISTRATION_EMAIL,
	    REGISTRATION_PASSWORD
	   } from './Constants';

const intialStateInput={
   input:''
}

const initialState={
	name:'',
	email:'',
	password:''
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
		return Object.assign({},state,{name:action.payload})
		case REGISTRATION_EMAIL:
		return Object.assign({},state,{email:action.payload})
		case REGISTRATION_PASSWORD:
		return Object.assign({},state,{password:action.payload})

		default:
		return state;
	}
}
