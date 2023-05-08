const router = require('express').Router();
const Customer = require('../models/customer.model');

router.route('/').get((req,res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const bill_address = req.body.bill_address;
    const ship_address = req.body.ship_address;
    const GSTN = req.body.GSTN;
    const email = req.body.email;
    const contact = req.body.contact;
    const newCustomer = new Customer({
        name,
        bill_address: {
            line1: bill_address.line1,
            line2: bill_address.line2,
            city: bill_address.city,
            state: bill_address.state,
            pin: bill_address.pin
        },
        ship_address: {
            line1: ship_address.line1,
            line2: ship_address.line2,
            city: ship_address.city,
            state: ship_address.state,
            pin: ship_address.pin
        },
        GSTN,
        email,
        contact
    });
    
    newCustomer.save()
        .then(() => res.json('Customer added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            customer.name = req.body.name;
            customer.bill_address.line1 = req.body.bill_address.line1;
            customer.bill_address.line2 = req.body.bill_address.line2;
            customer.bill_address.city = req.body.bill_address.city;
            customer.bill_address.state = req.body.bill_address.state;
            customer.bill_address.pin = req.body.bill_address.pin;
            customer.ship_address.line1 = req.body.ship_address.line1;
            customer.ship_address.line2 = req.body.ship_address.line2;
            customer.ship_address.city = req.body.ship_address.city;
            customer.ship_address.state = req.body.ship_address.state;
            customer.ship_address.pin = req.body.ship_address.pin;
            customer.GSTN = req.body.GSTN;
            customer.email = req.body.email;
            customer.contact = req.body.contact;
            customer.state = req.body.state;
            customer.save()
                .then(() => res.json('Customer updated!'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router;
