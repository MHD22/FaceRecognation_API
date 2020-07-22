const handleSignin=(bcrypt,db)=>(req,res)=>{
	const {email,password}=req.body;
		db('logins')
		.select('email','hash')
		.where('email',email)
		.then(data=>{
				bcrypt.compare(password, data[0].hash, function(err, ress) {
    			if(ress){
    			db('users').select('*').where('email','=',email)
    				.then(userr=> res.json(userr[0]))
    				.catch(err=>res.status(400).json('error users..'))
    			}
    			else{
    				res.status(401).json("unable to access...!")
    			}
				});
		})
		.catch(err=>res.status(402).json("error logins"))// end 
		
 }
 module.exports={handleSignin};