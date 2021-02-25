const express = require('express');
const morgan = require('morgan');

const tourrRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

////////////////////////
//     MIDDLEWARE     //
////////////////////////
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

// Create own middleware 
app.use((req, res, next) => {
  console.log('Hello from middleware 👋🏽 ');
  next();
})

// Middleware manipulate object date
app.use((req, res, next) => { 
  req.requestTime = new Date().toISOString();
  next();
})

//////////////////////////
//        ROUTES       //
////////////////////////

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.use('/api/v1/tours', tourrRouter);
app.use('/api/v1/users', userRouter);

//////////////////////////
//        SERVER       //
////////////////////////

module.exports = app;