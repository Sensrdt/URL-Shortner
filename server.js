const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({extented : false}));


app.use('/', require('./routes/redirect'));
app.use('/v1/', require('./routes/createUrl'));

const PORT = 4040

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
