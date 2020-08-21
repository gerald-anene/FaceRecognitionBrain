import React,{Component} from 'react';
import { connect } from 'react-redux';
import { UserEntersName, UserEntersEmail, UserEntersPassword } from './RegisterActions';

const mapStateToProps=(state)=>{
  return{
    name:state.onRegistration.name,
    email:state.onRegistration.email,
    password:state.onRegistration.password
  }
}

const mapDispatchToProps=(dispatch)=>{
 return{
  onNameChange:(event)=>dispatch(UserEntersName(event.target.value)),
  onEmailChange:(event)=>dispatch(UserEntersEmail(event.target.value)),
  onPasswordChange:(event)=>dispatch(UserEntersPassword(event.target.value))

 } 
}


class Register extends Component{

	onRegister=()=>{
		fetch('http://localhost:3000/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(

                                {   
                                	"name":this.props.name,
                                	"email":this.props.email,
                                	"password":this.props.password
                                }
            	                )
		})
		  .then(response=>response.json())
		  .then(user=>{
		  	if(user){
		  		this.props.loadUser(user);
		  		this.props.onRouteChange('home');
		  		
		  	}
		  })

		
	}

	render(){

		return(


       <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
           <main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
			        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        type="text" name="name"
			            id="name"
			            onChange={this.props.onNameChange}
			         />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
			         type="email" 
			         name="email-address" 
			          id="email-address"
			          onChange={this.props.onEmailChange}
			          />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password" 
			         id="password"
			         onChange={this.props.onPasswordChange}
			         />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={this.onRegister}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
			       type="submit"
			        value="Register"
			        />
			    </div>
			  </div>
          </main>
        </article>

		  )

	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);