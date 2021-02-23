const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync('/Users/josephni/Documents/DEV/diner-webapp/node-diner-app/dev-data/data/tours-simple.json')
    );
  
  // Check all ressources on Json Files
  exports.getAllTours = (req, res) => {
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
  exports.getTour = (req, res) => {
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
  exports.createTour = (req, res) => {
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
  exports.updateTour =  (req,res) => {
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
  exports.deleteTour = (req,res) => {
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
