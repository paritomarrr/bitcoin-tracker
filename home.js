const express = require("express");
const app = express();

// Serve the verification text at the required path
app.get('/cryptoapisverifydomain', (req, res) => {
  res.send('cryptoapis-cb-4161d23347376f8a6e107bf71415892292edf9c45a5ad5c7e22f3f2fa2671f0f');
});

// app.get('/cryptoapisverifydomain.txt', (req, res) => {
//   res.type('text/plain');
//   res.send('cryptoapis-cb-3d8aa04d783b3f7024329fce37b4e9885e1587e69fc242dddb8f66c82dfc1960');
// });

// app.get('/cryptoapisverifydomain.html', (req, res) => {
//   res.type('text/html');
//   res.send('<html><body>cryptoapis-cb-3d8aa04d783b3f7024329fce37b4e9885e1587e69fc242dddb8f66c82dfc1960</body></html>');
// });

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




