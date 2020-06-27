const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://taskapp:@Lucknow160@cluster0-jfyyd.mongodb.net/mern-app?w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to Database');
}).catch((error) => {
    console.log(error);
});
