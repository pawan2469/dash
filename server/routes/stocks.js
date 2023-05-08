const router = require('express').Router();
let Stock = require('../models/stock.model');

router.route('/').get((req,res) => {
    Stock.find()
    .then(stocks=>res.json(stocks))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res)=>{
    const size = req.body.size;
    const colour = req.body.colour;
    const neck = req.body.neck;
    const company = req.body.company;
    const shape = req.body.shape;
    const packing = req.body.packing;
    const quantity = req.body.quantity;
    const weight = req.body.weight;

    const newStock = new Stock({size,colour,company,shape,packing,quantity,neck,weight});
    newStock.save()
    .then(()=>res.json('Stock added!'))
    .catch(err=>res.status(400).json('Error: '+err));

});


router.route('/:id').get((req,res) => {
    Stock.findById(req.params.id)
    .then(Customer => res.json(Customer))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Stock.findByIdAndDelete(req.params.id)
    .then(Stock => res.json('Stock deleted' +Stock))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res) => {
    Stock.findById(req.params.id)
    .then(stock => {
        stock.size = req.body.size;
        stock.colour = req.body.colour;
        stock.neck = req.body.neck;
        stock.company = req.body.company;
        stock.shape = req.body.shape;
        stock.packing = req.body.packing;
        stock.quantity = req.body.quantity;
        stock.weight = req.body.weight;
        stock.save()
    .then(() => res.json('Stock updated ! '+stock))
    .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;