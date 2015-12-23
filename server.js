'use strict';
let express = require('express');
let moment = require('moment');

let app = express();

app.use( express.static('./public') );
app.use( express.static('./node_modules/bootstrap/dist') );

app.listen( 3000 );
console.log('Server is running on port 3000 at %s', moment().format() );
