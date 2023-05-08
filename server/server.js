const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const customerRoute = require('./routes/customers');
const stockRoute = require('./routes/stocks');
const challanRoute = require('./routes/challans');
const invoiceRoute = require('./routes/invoice');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection= mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connection established successfully !!");
})

app.use('/customers', customerRoute);
app.use('/stocks', stockRoute);
app.use('/challans',challanRoute);
app.use('/invoices',invoiceRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});