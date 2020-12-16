import Clarifai from 'clarifai';


const app = new Clarifai.App({
    apiKey: process.env.APIKEY
  });


const handleApiCall = (req, res) =>{
    if(req.body.input === ''){
        res.status(400).json("Invaild Input");
    }else{
        app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json("Image Not Found.")
        })
    }
    
}



const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })

}

export { handleApiCall, handleImage };