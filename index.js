const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
console.log('Express api poc')
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});