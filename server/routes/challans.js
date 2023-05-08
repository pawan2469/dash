const router = require('express').Router();
const Challan = require('../models/challan.model');

router.route('/').get((req,res) => {
    Challan.find()
        .then(challans => res.json(challans))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const no = Number(req.body.no);
    const date = Date.parse(req.body.date);  
    const amount = req.body.amount;
    const items = req.body.items;

    const itemObjs = items.map(item => {
        return {
            noOfBoxes: item.noOfBoxes,
            packing: item.packing,
            rate: item.rate,
            item_name: item.item_name,
            subtotal: item.subtotal
        }
    });
        const newChallan = new Challan({
        name,
        no,
        date,
        amount,
        items: itemObjs
    });

    newChallan.save()
        .then(() => res.json('Challan added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => {
    Challan.findById(req.params.id)
        .then(challan => res.json(challan))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Challan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Challan deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res) => {
    Challan.findById(req.params.id)
        .then(challan => {
            challan.name = req.body.name;
            challan.no = req.body.no;
            challan.date = req.body.date;
            challan.amount = req.body.amount;
            challan.items = req.body.items;

            const itemObjs = challan.items.map(item => {
                return {
                    noOfBoxes: item.noOfBoxes,
                    packing: item.packing,
                    rate: item.rate,
                    item_name: item.item_name,
                    subtotal: item.subtotal
                }
            });

            challan.save()
                .then(() => res.json('Challan updated!'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});



module.exports = router;
