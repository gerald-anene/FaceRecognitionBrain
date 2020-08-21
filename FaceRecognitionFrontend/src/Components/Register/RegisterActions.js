import { 
	    REGISTRATION_NAME,
	    REGISTRATION_EMAIL,
	    REGISTRATION_PASSWORD
       } from './RegisterConstants';


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

