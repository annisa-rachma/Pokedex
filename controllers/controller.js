// const Model = require('../models/model')
// const { renderChart } = require('../helpers/charts')
const {Pokemon, User, UserDetail, UserHasPokemon} = require('../models')
// const chartModel = require('../helpers/charts');
const bcrypt = require('bcryptjs')
const userhaspokemon = require('../models/userhaspokemon')
const { Op } = require("sequelize");


class Controller {

    /******************************** SIGN UP *************************************/
    static registerForm(req, res) {
      res.render('signUp-page')
    }
    static postRegister(req, res) {
      const {firstName, lastName, email, password, role} = req.body

      User.create({email, password, role})
        .then((newUser) => {
          let UserId = newUser.id
          return UserDetail.create({firstName, lastName, UserId})
        })
        .then(() => {
          res.redirect('/')
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        })
    }

    /******************************** LOG IN *************************************/
    static logInForm(req, res) {
      const {errors} = req.query

      res.render('login-page', {errors})
    }
    static postForm(req, res) {
      const {email, password} = req.body

      User.findOne({where : {email}})
        .then((result) => {
          if(result) {
            let id = result.dataValues.id
            // console.log(result)
            const isValidPassword = bcrypt.compareSync(password, result.password);

            if(isValidPassword) {
              return res.redirect(`/homepage/${id}`)
            } else {
              let errorPassword = "invalid email/password"
              return res.redirect(`/?errors=${errorPassword}`)
            }
          } else {
            let errorPassword = "invalid email/password"
            return res.redirect(`/?errors=${errorPassword}`)
          }
        })
        .catch((err) => {
          if(err.name === "SequelizeValidationError") {
              err = err.errors.map((el) => {
                  return el.message
              })
              res.redirect(`/?errors=${err.join(';')}`)
          } else {
              console.log(err)
              res.send(err)
          }
      })
    }



    /******************************** HOMEPAGE *************************************/

    static home(req, res) {
        const {userId} = req.params

        let dataPokemon
        Pokemon.findAll({
          include : {
            model : UserHasPokemon
          }, where: {
            '$UserHasPokemons.id$': {
              [Op.is]: null, // Check if there are no related entries in UserHasPokemons
            },
          },
        })
        .then((pokemonData) => {
            // dataPokemon = 
            // res.send(pokemonData)
            res.render('home', {pokemonData, userId})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    /******************************** ADD POKEMON *************************************/
    static addPokemonToPokedex(req, res) {
      const {userId, pokemonId} = req.params

      UserHasPokemon.create({PokemonId : pokemonId, UserDetailId : userId})
      .then((result) => {
        res.redirect(`/homepage/${userId}`)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
    })
    }

    /******************************** ADD POKEMON *************************************/
    static detailPokemon(req, res) {
      const {userId, pokemonId} = req.params

      Pokemon.findByPk(+pokemonId)
      .then((result) => {
        // res.send(result)
        res.render('detailPokemon', {result, userId, pokemonId})
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
    }

    static deletePokemonFromPokedex(req, res) {

    }

 


    // static detailPokemon(req, res) {
    // const data = chartModel.getChartData();
    // res.render('detailPokemon', { data });
    // };

}

module.exports = Controller