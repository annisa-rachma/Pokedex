// const Model = require('../models/model')
// const { renderChart } = require('../helpers/charts')
const {Pokemon, User, UserDetail, UserHasPokemon} = require('../models')
// const chartModel = require('../helpers/charts');
const bcrypt = require('bcryptjs')
const userhaspokemon = require('../models/userhaspokemon')
const { Op, literal } = require('sequelize');


class Controller {

    /******************************** SIGN UP *************************************/
    static registerForm(req, res) {
      const {errors} = req.query

      res.render('signUp-page', {errors})
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
          if(err.name === "SequelizeValidationError") {
            err = err.errors.map((el) => {
                return el.message
            })
            res.redirect(`/addUser?errors=${err.join(', ')}`)
          } else {
              console.log(err)
              res.send(err)
          }
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
              req.session.idUser = result.dataValues.id
              req.session.role = result.dataValues.role

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
        const {search} = req.query
        let pokemonData
        // Pokemon.findAll({
        //   include : {
        //     model : UserHasPokemon,
        //     where : {
        //       UserDetailId : {
        //         [Op.ne] : userId
        //       }
        //     }
        //   }
        // })
        // .then((result) => {
        //     pokemonData = result

        //     return Pokemon.findAll({
        //       include : {
        //         model : UserHasPokemon
        //       }, where: {
        //         '$UserHasPokemons.id$': {
        //           [Op.is]: null, 
        //         },
        //       },
        //     })
        // })
        // .then((result) => {
        //   result.forEach(element => {
        //     pokemonData.push(element)
        //   });
        //   // res.send(pokemonData)
        //   res.render('home', {pokemonData, userId})
        // })
        // .catch((err) => {
        //     console.log(err)
        //     res.send(err)
        // })

      //yang bisa
        

      let option = {
        include : {
          model : UserHasPokemon
        }, where: {
          '$UserHasPokemons.id$': {
            [Op.is]: null, 
          },
        },
      }

      if(search) {
        option.where = {
          [Op.and]: [
            option.where,
            {
              name: {
                [Op.iLike]: `%${search}%`, // Use Op.like to perform a case-insensitive search
              },
            },
          ],
        };
      }
      Pokemon.findAll(option)
        .then((result) => {
          pokemonData = result
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

    /******************************** DETAIL POKEMON *************************************/
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

    /******************************** POKEDEX *************************************/
    static showPokedex(req, res){
      const {userId, pokemonId} = req.params
      UserDetail.findAll({
        include: {
          model: UserHasPokemon,
          where: {
            UserDetailId : userId
          },
          include: {
            model : Pokemon
          }
        } 
      
      })
      .then((result) => {
        result = result[0]
        // res.send(result)
        // console.log(result,'<<<<<<<<<');
        res.render('pokedex', {result, userId, pokemonId})
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
    }

    
    /******************************** DELETE POKEMON FROM POKEDEX *************************************/
    static deletePokemonFromPokedex(req, res) {
      const { userId, pokemonId } = req.params;

      UserHasPokemon.destroy({
        where : {
          UserDetailId : userId,
          PokemonId : pokemonId
        }
      })
      .then((result) => {
        res.redirect(`/pokedex/${userId}`)
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  
    }

    /******************************** EDIT USER *************************************/
    static editUserFrom(req, res) {
      // res.send('hello')
      const {userId} = req.params
      UserDetail.findByPk(userId, {
        include : User
      })
      .then((result) => {
        // res.send(result)
          res.render("editUser", {result, userId});
      })
      .catch((err) => {
          console.log(err);
          res.send(err);
      });

  }

  static postEditUserForm(req, res) {
      // console.log(req.body);
      const { firstName, lastName, email } = req.body;
      const { userId } = req.params;
      UserDetail.update(
          { firstName, lastName },
          {
              where: {
                  id: +userId,
              },
          })
          .then((result) => {
              // console.log(result);
              return User.update({email}, {
                where: {
                    id: +userId,
                },
            })

          })
          .then(() => {
            res.redirect(`/homepage/${userId}`);
          })
          .catch((err) => {
              res.send(err);
          });
  }


    /******************************** ADD NEW POKEMON *************************************/
    static addNewPokemon(req, res) {
      const { userId } = req.params;
      const {errors} = req.query

      res.render('addNewPokemon', {errors, userId})
    }

    static addNewPokemonPost(req, res) {
      const { userId } = req.params;

      const {name, type, imageUrl, weight, height, hp, attack, defense, speed,skill} = req.body
      let isSelected = false
      Pokemon.create({name, type, imageUrl, weight, height, hp, attack, defense, speed,skill, isSelected})
        .then((result) => {
          res.redirect(`/homepage/${userId}`)
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        })
    }


    /******************************** LOGOUT *************************************/

    static logout(req, res) {
      req.session.destroy((err) => {
        if(err) {
          console.log(err)
          res.send(err)
        } else {
          res.redirect('/')
        }
      })
    }

}

module.exports = Controller