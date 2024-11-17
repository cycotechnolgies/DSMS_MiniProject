const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Node server is listening to ${PORT}`);
});


