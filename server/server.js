const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const apiRouter = require('./routers/api');

// var busboy = require('connect-busboy');
// var multer  = require('multer')
// var upload = multer({ dest: '/uploads' })
// app.use(busboy({ immediate: true }));

// var cors = require('cors');
// app.use(cors())

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, 'public')
// },
// filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }
// })

// var upload = multer({ storage: storage }).single('file')

// app.post('/photo',function(req, res) {
     
//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)

//   })

// });

// BODY PARSERS & COOKIE PARSER
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// SERVE UP STATIC FILES
app.use('/dist', express.static(path.join(__dirname, '../dist')));


app.use('/photo', (req, res) => {
  console.log(req.file)
  console.log(req.body);
  res.status(200).send('It worked!')
})

// app.use(function(req, res) {
//   if (req.busboy) {
//     console.log('outer!')
//     console.log(req.busboy)
//     req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//       console.log('inner!!!')
//     });
//     req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
//       // ...
//     });
//   }
//   // etc ...
// });

// SERVE INDEX.HTML ON THE ROUTE '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// API ROUTER
app.use('/api', apiRouter);

// HANDLING UNKNOWN URLS
app.use('*', (req, res) => {
  res.status(404).send('URL path not found');
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(401).send(err.message); // WHAT IS FRONT-END EXPECTING? JSON OR STRING?
});

//app.listen(3000); //listens on port 3000 -> http://localhost:3000/
app.listen(process.env.PORT || 3000);
module.exports = app;
