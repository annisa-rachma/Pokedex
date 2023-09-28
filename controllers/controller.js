// const Model = require('../models/model')
// const { renderChart } = require('../helpers/charts')
const {Pokemon, User, UserDetail, UserHasPokemon} = require('../models')
const chartModel = require('../helpers/charts');

class Controller {
    static home(req, res) {
        Pokemon.findAll({
          where : {
            isSelected: false
        }
        })
        .then((pokemonData) => {
            console.log(pokemonData)
            res.render('home', {pokemonData})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    //di sini ngeupdate isSelected by idUser
    static addPokemonToPokedex(req, res) {

    }

    static deletePokemonFromPokedex(req, res) {

    }

    static detailPokemon(req, res) {
        res.render('detailPokemon', {chartData})
    }


    // static detailPokemon(req, res) {
    // const data = chartModel.getChartData();
    // res.render('detailPokemon', { data });
    // };

}

module.exports = Controller