const handleRegister=(db,bcrypt)=>(req,res)=>{
	const {name ,email,password}=req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    	db.transaction(trx=>{
    		trx('logins').insert({
    			'email':email,
    			'hash':hash
    		}).returning('email')//end process 1
    		.then(loginEmail=>{
	    		trx('users').insert({
	    				name: name,
			    		email:loginEmail[0],
			    		joined: new Date()
	    			})
	    		.returning('*')
	    		.then(user=> res.json("added successfully"))
	    		.catch(err=> res.status(400).json("unable to register! in users "))
    		})
    		.catch(err=> res.status(400).json("unable to register! in logins "))
    		.then(trx.commit)
    		.catch(trx.rollback);
    	})//end of transaction	
	});
 };
 module.exports={handleRegister};