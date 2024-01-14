var express = require('express');
var router = express.Router();
const BOOKS = []
const Book = require("../models/abc");
const nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.post('/register', async function(req, res, next) {
  // Book.create(req.body)
  try{
    const kavita = new Book(req.body);
    await kavita.save()
    res.redirect("/show");
  }
  catch(err){
    res.send(err);
  }
  // .then(()=> res.redirect("/show"))
  // .catch((err)=> res.send(err));
  // BOOKS.push(req.body)
  // res.redirect("/show")
});
router.get('/show', async function(req, res, next) {
  try{
    const BOOKS = await Book.find()
    res.render('show', { book:BOOKS});
  }
  catch(err){
    res.send(err);
  }
});

router.get('/details/:id', async function(req, res, next) {
  try{
    const book = await Book.findById(req.params.id);
    res.render('details', { book:book});
  }
  catch(err){
    res.send(err);
  }
});

router.get('/delete/:id', async function(req, res, next){
try{
await Book.findByIdAndDelete(req.params.id);
res.redirect('/show')
}
catch(err){
  res.send(err);
}
});
router.get('/update/:id', async function(req, res, next){
try{
const book = await Book.findById(req.params.id);
res.render("update",{book:book})
}
catch(err){
  res.send(err);
}
});
router.post('/update/:id', async function(req, res, next){
try{
const book = await Book.findByIdAndUpdate(req.params.id, req.body);
res.redirect(`/details/${req.params.id}`);
}
catch(err){
  res.send(err);
}
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
router.get('/sendmail', function(req, res, next) {
  res.render("sendmail")
});

router.post('/sendmail', function(req, res, next) {
  sendmail(req.body.email, res)



function sendmail(email, res) {

  const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
          user: "rahulyadav.0441@gmail.com",
          pass: "pcgirtratnyzwkyr",
      },
  });

  const mailOptions = {
      from: "Yadav Pvt. Ltd.<rahulyadav.0441@gmail.com>",
      to: email,
      subject: "Password Reset Link",
      // text: "Do not share this link to anyone.",
      html: `This is Test Mail`,
  };

  transport.sendMail(mailOptions, (err, info) => {
      if (err) return res.send(err);
      console.log(info);

      return res.send(
          "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1>"
      );
  });
}
});

module.exports = router;
