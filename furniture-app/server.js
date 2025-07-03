require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Connect DB
connectDB(process.env.MONGO_URI);

const app = express();
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({mongoUrl:process.env.MONGO_URI})
}));

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/api/stats', require('./routes/stats'));
app.use('/stats', require('./routes/stats'));
app.use('/',require('./routes/auth'));
app.use('/furnitures', require('./routes/furniture'));
app.use('/material', require('./routes/material'));
app.use('/categories', require('./routes/category'));


app.get('/dashboard',require('./middleware/auth'),async (req,res)=>{
  res.render('dashboard',{title:'Dashboard'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on ${PORT}`));