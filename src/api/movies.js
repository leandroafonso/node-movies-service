module.exports = (app, repository) => {

  app.get('/movies', (req, res, next) => {
    repository.getAllMovies((err, movies) => {
      if(err) return next(err);
      res.json(movies);
    });
  })

  app.get('/movies/premieres', (req, res, next) => {
    repository.getMoviePremiers((err, movies) => {
      if(err) return next(err);
      res.json(movies)
    });
  })

  app.get('/movies/:id', (req, res, next) => {
    repository.getMovieById(req.params.id, (err, movie) => {
      if(err) return next(err);
      res.json(movie)
    });
  })

  //authentication
  app.post('/login', (req, res, next) => {
    var jwt = require('jsonwebtoken');
    var email = req.body.email;
    var pwd = req.body.pwd;
    
    repository.getUser(email, pwd, (err, user) => {
      if(err) 
        return next(err);
      
      if(user !== null){
        //auth ok
        console.log(user);
        const id = 1; //esse id viria do banco de dados
        var token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });
      }
      else{
        res.status(403).send({auth:false,message:'Login inválido!'});
      }
    });

    // if(req.body.user === 'luiz' && req.body.pwd === '123'){
    //   //auth ok
    //   const id = 1; //esse id viria do banco de dados
    //   var token = jwt.sign({ id }, process.env.SECRET, {
    //     expiresIn: 300 // expires in 5min
    //   });
    //   res.status(200).send({ auth: true, token: token });
    // }
    // else{
    // res.status(403).send({auth:false,message:'Login inválido!'});
    // }
  })

}