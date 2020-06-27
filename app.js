const express = require('express');
const bodyParser = require('body-parser');
require('./DB/mongoose');
const PlaceRoutes = require('./routes/Place-routes');
const UserRoutes = require('./routes/User-routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('It\'s working fine');
});

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//
//     next();
// });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, contentType, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/place', PlaceRoutes);
app.use('/api/user', UserRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
