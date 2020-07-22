const handleProfile=(db)=>(req,res)=>{
	const {id}=req.params;
	db.select('*').from('users')
	.where({id})
	.then(data=>{ 
		if(data.length){
		res.json(data[0])}
		else {res.status(400).json("Not Found User !")}
		})
	.catch(err=>res.status(400).json("error id not found !"));
 }
 module.exports={handleProfile};