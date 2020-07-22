const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '53c8563d207d4fb2aa7f758df4d7d68d'
  });    
const handleApiKey=(req,res)=>{

	app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.imageUrl).then(data=>{
    	if(data){
    		res.json(data);
    	}
    	else{res.json("empty image url..")}

    })
    .catch(err=>res.status(400).json("can't work with api ..."))

}

	

const handleImage= (db)=>(req,res)=>{
	const {id}=req.body;
	db('users')
	.increment('entries',1)
	.where('id',id)
	.returning('entries')
	.then(data=>{
		if(data.length){
		res.json(data[0])}
		else{
			res.status(400).json("ID is not found !!")
		}
	})
	.catch(err=>res.status(400).json("errorrr!!"));
 };
 module.exports = {handleImage, handleApiKey};