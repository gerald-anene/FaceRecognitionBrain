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


class App extends Component{

  constructor(props){
    super(props);

    this.state={
      input:'',
      imageUrl:'',
      box:{
        top_row:'',
        right_col:'',
        bottom_row:'',
        left_col:''
      },
      route:'signin',
      isSignedIn:false,
      User:{
              'id':'',
              'name':'',
              'email':'',
              'entries':0,
              'joined':''
      }
    }
  }

  onInputChange=(event)=>{

      this.setState({input:event.target.value})
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
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

  loadUser=(user)=>{
     this.setState({
      User:{
        'id':user.id,
        'name':user.name,
        'email':user.email,
        'entries':user.entries,
        'joined':new Date()
      }
     })
  }

  updateUserEntries=()=>{
    fetch('http://localhost:3000/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:this.state.User.id
      })
    })
     .then(response=>response.json())
     .then(user=>{
      if(user){
        this.setState(Object.assign(
           this.state.User,{
            entries:user[0].entries
          }

          ))
      }
     })
  }



  render(){
    const {isSignedIn,imageUrl, box, route}=this.state;
    const {onRouteChange,onButtonSubmit,onInputChange}=this;
   

  	return(
	          <div>
	           <Particles className="particles"
                params={particlesOption}
               />
               <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
               {route==='home'
                ?<div>
                   <Logo />
      	           <Rank name={this.state.User.name} entries={this.state.User.entries} />
      	           <ImageLinkForm 
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                    />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
               :(
                  route==='signin'
                   ?<Signin onRouteChange={onRouteChange} loadUser={this.loadUser} />
                   :<Register onRouteChange={onRouteChange} loadUser={this.loadUser}/>
                )
                
              }
              
	          </div>
  		   )
  }

    
}

export default App;
