const express = require('express');
const cookieParser = require('cookie-parser');

const adminRoute = require('./routes/admin.route');
const urlRoute = require('./routes/url.route');
const staticRoute = require('./routes/static.route');
const userRoute = require('./routes/user.route');

const { authenticateUser, restrictTo } = require('./backend/middlewares/auth.middleware');


// mongoDB connection
const {mongoConnect} = require('./mongoConnect');

mongoConnect('mongodb://localhost:27017/shortUrlDB')
.then(()=> console.log('MongoDB connected'));  

// express app
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authenticateUser);

//routes
app.use('/admin',restrictTo(['ADMIN']), adminRoute);
app.use('/url',restrictTo(["USER", "ADMIN"]), urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})