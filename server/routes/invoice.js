const router = require('express').Router();
const Invoice = require('../models/invoice.model');

router.route('/').get((req,res) => {
    Invoice.find()
        .then(invoices => res.json(invoices))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').get((req,res) => {
    Invoice.findById(req.params.id)
        .then(invoice => res.json(invoice))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Invoice.findByIdAndDelete(req.params.id)
        .then(() => res.json('Invoice deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    const invoice_no = req.body.invoice_no;
    const name = req.body.name;
    const bill_address = req.body.bill_address;
    const date = req.body.date;
    const ship_address = req.body.ship_address;
    const GSTN = req.body.GSTN;
    const email = req.body.email;
    const contact = req.body.contact;
    const items = req.body.items;
    const total_qty = req.body.total_qty;
    const taxable_amount = req.body.taxable_amount;
    const round_off = req.body.round_off;
    const total_tax = req.body.total_tax;
    const vehicle_no = req.body.vehicle_no;
    const ewaybill_no = req.body.ewaybill_no;
    const tr_no = req.body.tr_no;
    const tr_name = req.body.tr_name;

    const newInvoice = new Invoice({
        invoice_no,
        name,
        date,
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
        contact,
        items,
        total_qty,
        taxable_amount,
        round_off,
        total_tax,
        vehicle_no,
        ewaybill_no,
        tr_no,
        tr_name
    });

    newInvoice.save()
        .then(() => res.json('Invoice added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    Invoice.findById(req.params.id)
        .then(invoice => {
            invoice.invoice_no = req.body.invoice_no;
            invoice.name = req.body.name;
            invoice.bill_address.line1 = req.body.bill_address.line1;
            invoice.bill_address.line2 = req.body.bill_address.line2;
            invoice.bill_address.city = req.body.bill_address.city;
            invoice.bill_address.state = req.body.bill_address.state;
            invoice.bill_address.pin = req.body.bill_address.pin;
            invoice.ship_address.line1 = req.body.ship_address.line1;
            invoice.ship_address.line2 = req.body.ship_address.line2;
            invoice.ship_address.city = req.body.ship_address.city;
            invoice.ship_address.state = req.body.ship_address.state;
            invoice.ship_address.pin = req.body.ship_address.pin;
            invoice.date = req.body.date;
            invoice.GSTN = req.body.GSTN;
            invoice.email = req.body.email;
            invoice.contact = req.body.contact;
            invoice.items = req.body.items;
            invoice.total_qty = req.body.total_qty;
            invoice.taxable_amount = req.body.taxable_amount;
            invoice.round_off = req.body.round_off;
            invoice.total_tax = req.body.total_tax;
            invoice.vehicle_no = req.body.vehicle_no;
            invoice.ewaybill_no = req.body.ewaybill_no;
            invoice.tr_no = req.body.tr_no;
            invoice.tr_name = req.body.tr_name;

            invoice.save()
                .then(() => res.json('Invoice updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
