
const  mongoose = require ("mongoose");
const url = process.env.MONGODB_URL
mongoose.set('strictQuery', true)
mongoose.connect(url, { useUnifiedTopology: true, 
})
.then(() =>{
    console.log("DB Connected");
})
.catch((err) => console.log(err));
