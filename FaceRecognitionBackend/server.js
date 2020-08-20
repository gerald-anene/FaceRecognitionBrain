const express=require('express');
var cors = require('cors')
const bcrypt = require('bcrypt-nodejs');

const app=express();
app.use(cors())
const knex = require('knex')

const db=knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Daseinkc1',
    database : 'smart-brain'
  }
});

app.use(express.json());

app.get('/',(req,res)=>{
	res.json(database.Users);
})

app.post('/signin',(req,res)=>{
 
 db.select('hash','email')
 .from('login')
 .where('email', '=',req.body.email)
 .then(data=>{
 	const isValid= bcrypt.compareSync(req.body.password, data[0].hash);
 	if(isValid){
 	  return db.select('*')
 	     .from('users')
 	     .where('email','=', req.body.email)
 	     .then(user=>{
 	     	res.json(user[0]);
 	     })
 	     .catch(err=>res.json("no such user"))
 }else{
 	res.status(400).json("error")
 }
})
 .catch(err=>res.status(400).json("wrong credentials"))
});


app.post('/register',(req,res)=>{
	const {name,email,password, id}=req.body;
	var hash = bcrypt.hashSync(password);

	   db.transaction(trx=>{

	   	trx.insert({
          hash:hash,
          email:email
	   	})
	   	.into('login')
	   	.returning('email')
	   	.then(loginEmail=>{
        return trx('users')
		.returning('*')
		.insert({
			name:name,
			email:loginEmail[0],
			joined:new Date()
		}).then(user=>{
			res.status(201).json(user[0]);
		})

	   	})
	   	.then(trx.commit)
	   	.catch(trx.rollback)
	   })
		.catch(err=>res.status(400).json("Unable to register"))
})

app.get('/profile/:id',(req,res)=>{

   const { id }=req.params;

   db
   .select('*')
   .from('users')
   .where({id})
   .then(user=>{
   	if(user.length){
   		res.json(user);
   	}else{
   		res.status(400).json("Not found");
   	}
   })
   .catch(err=>res.status(400).json("error getting user"));
})


app.put('/image',(req,res)=>{

	const { id }= req.body;

	db('users')
	.where('id','=',id)
	.increment('entries',1)
	.returning('*')
	.then(response=>{
		if(response.length){
			res.json(response)
		}else{
			res.status(400).json("no user found");
		}
	})
	.catch(err=>res.json("unable to return a user"))
	
})


app.listen(3000, ()=>{
	console.log("server is running on port 3000");
});