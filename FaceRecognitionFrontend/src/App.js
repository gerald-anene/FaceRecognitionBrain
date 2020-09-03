import React, {Component} from 'react';
import './App.css';
import Signin from './Components/signin/signin';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Register from './Components/Register/Register';
import { connect } from 'react-redux';
import { UserEntersUrl,UserEntersName, UserEntersEmail, UserEntersPassword, LoadRegisterdUser, UpdateSignedInUser,UpdateImageUrl } from './Actions';


const particlesOption={
            		particles: {
            			number:{
            				value:60,
            				density:{
            					enable:true,
            					value_area:800
            				}
            			}
            		}
            	}



const app = new Clarifai.App({apiKey: 'a7a721567ad7479a9fe6ac6a3a2144ce'});

const mapStateToProps=state=>{
  return{
    input:state.onEnterImageUrl.input,
    RegName:state.onRegistration.RegName,
    RegEmail:state.onRegistration.RegEmail,
    RegPassword:state.onRegistration.RegPassword,
    isPending:state.LoadUser.isPending,
    User:state.LoadUser.User,
    error:state.LoadUser.errorUs,
    Url:state.LoadUser.Url

  }
}

const mapDispatchToProps=dispatch=>{
 return{
  onInputChange:(event)=>dispatch(UserEntersUrl(event.target.value)),
  onNameChange:(event)=>dispatch(UserEntersName(event.target.value)),
  onEmailChange:(event)=>dispatch(UserEntersEmail(event.target.value)),
  onPasswordChange:(event)=>dispatch(UserEntersPassword(event.target.value)),
  loadUser:(user)=>dispatch(LoadRegisterdUser(user)),
  onUpdateUser:(user)=>dispatch(UpdateSignedInUser(user)),
  imageUrl:(url)=>dispatch(UpdateImageUrl(url))
 } 
}


class App extends Component{

  constructor(props){
    super(props);

    this.state={
      box:{
        top_row:'',
        right_col:'',
        bottom_row:'',
        left_col:''
      },
      route:'signin',
      isSignedIn:false,
    }
  }

  onButtonSubmit=()=>{
    this.props.imageUrl(this.props.input)

    console.log(this.props);
    
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.props.input)
        .then(response=>{
          if(response){
            if(document.getElementById('imagefield').value!==''){
                 this.updateUserEntries();
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
          }
        })
        .then(res=>document.getElementById('imagefield').value='')
        .catch(err =>console.log(err));
  }

  calculateFaceLocation=(data)=>{

   const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
   const image=document.getElementById("inputImage");

   const width=Number(image.width);
   const height=Number(image.height);

   return {

    left_col:clarifaiFace.left_col*width,
    top_row:clarifaiFace.top_row*height,
    right_col:width-(clarifaiFace.right_col*width),
    bottom_row:height-(clarifaiFace.bottom_row*height)

    }

  }

  displayFaceBox=(box)=>{
    this.setState({box:box});
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }

    this.setState({route:route});
    
   
  }
  updateUserEntries=()=>{
    fetch('http://localhost:3000/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:this.props.User.id
      })
    })
     .then(response=>response.json())
     .then(user=>{
      if(user){
        this.setState(Object.assign(
           this.props.User,{
            entries:user[0].entries
          }

          ))
      }
     })
  }

  render(){
    const {isSignedIn, box, route}=this.state;
    const {onRouteChange,onButtonSubmit}=this;
    const { onInputChange,Url }=this.props;
   

  	return(
	          <div>
	           <Particles className="particles"
                params={particlesOption}
               />
               <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
               {route==='home'
                ?<div>,lwa    
                   <Logo />
      	           <Rank name={this.props.User.name} entries={this.props.User.entries} />
      	           <ImageLinkForm 
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                    />
                    <FaceRecognition box={box} imageUrl={Url} />
                </div>
               :(
                  route==='signin'
                   ?<Signin  onRouteChange={onRouteChange} onUpdateUser={this.props.onUpdateUser} />
                   :<Register onRouteChange={onRouteChange} loadUser={this.props.loadUser} RegName={this.props.RegName} RegEmail={this.props.RegEmail} RegPassword={this.props.RegPassword} onNameChange={this.props.onNameChange} onEmailChange={this.props.onEmailChange} onPasswordChange={this.props.onPasswordChange}/>
                )
                
              }
              
	          </div>
  		   )
  }

    
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


