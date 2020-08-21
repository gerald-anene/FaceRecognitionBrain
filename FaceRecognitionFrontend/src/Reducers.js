import { ENTER_IMAGE_URL } from './Constants';

const intialStateInput={
   input:''
}

export const onEnterImageUrl=(state=intialStateInput,action={})=>{

	switch(action.type){
		case ENTER_IMAGE_URL:
		return Object.assign({},state,{input:action.payload});

		default:
		return state;
	}

}