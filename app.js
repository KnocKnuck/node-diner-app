const fs = require('fs')
const express = require('express')
const morgan = require('morgan')


const app = express();

////////////////////////
//     MIDDLEWARE     //
////////////////////////
app.use(morgan('dev'));

app.use(express.json());

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


const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json'))


//////////////////////////
//     ROUTEURS        //
////////////////////////

  // Check all ressources on Json Files
const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res
  .status(200)
  .json({status: 'success',
  requestedAt : req.requestTime,
        results: tours.length,
        data : {
             tours
            }
  })
}

// Check only 1 Ressource - informations
const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1

  if(id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wrong ID'
    })
  }

  const tour = tours.find(el => el.id == id)

  res
  .status(200)
  .json({status: 'success',
        results: tours.length,
        data : {
             tour
            }
  })
}

// Check if creating/adding new informations to API work
const createTour = (req, res) => {
  // console.log(req.body)
  const newId = tours[tours.length -1].id +1;
  const newTour = Object.assign({id: newId}, req.body);

  tours .push(newTour)
  fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data : {
        tour : newTour
      }
    })
  })
}

// Check if updating a ressources is working 
const updateTour =  (req,res) => {
  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wrong ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Working on Update>'
    }
  })
}

// Check if deleting an information is updating 
const deleteTour = (req,res) => {
  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wrong ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
}

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined '
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined '
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined '
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined '
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined '
  })
}

//////////////////////////
//        ROUTES       //
////////////////////////

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)


app.route('/api/v1/tours').get(getAllTours).post(createTour)

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)


app.route('/api/v1/users').get(getAllUsers).post(createUser)
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)

//////////////////////////
//        SERVER       //
////////////////////////

const port = 3000
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})