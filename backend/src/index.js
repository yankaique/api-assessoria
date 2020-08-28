const express = require('express');
const app = express();
const {errors} = require('celebrate');
const routes = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333,function(){
    console.log("server is running on port 3535");
 });