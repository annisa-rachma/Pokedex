const Model = require('../models/model')
// const { renderChart } = require('../helpers/charts')
const chartModel = require('../helpers/charts');
const chartData = {
    labels: ['Attack', 'Defense', 'Speed', 'Special Attack', 'Special Defense'],
    datasets: [
      {
        label: 'Pokemon Stats',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [65, 70, 45, 80, 80], // Replace with your actual data
      },
    ],
  };

class Controller {
    static home(req, res) {
        Model.listPokemon()
        .then((pokemonData) => {
            // console.log(pokemonData)
            res.render('home', {pokemonData})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    static addPokemon(req, res) {
    }

    static deletePokemon(req, res) {
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