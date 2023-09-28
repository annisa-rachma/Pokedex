const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

/******************************** SIGN UP *************************************/
router.get('/addUser', Controller.registerForm)
router.post('/addUser', Controller.postRegister)

/******************************** LOG IN *************************************/
router.get('/', Controller.logInForm)
router.post('/', Controller.postForm)

/******************************** MIDDLEWARE *************************************/
router.use((req, res, next) => {
    console.log(req.session)

    console.log('Time:', Date.now())
    next()
})



/******************************** HOME *************************************/
router.get('/homepage/:userId', Controller.home)

/******************************** ADD POKEMON *************************************/
router.get('/homepage/:userId/addPokemon/:pokemonId', Controller.addPokemonToPokedex)

/******************************** DETAIL POKEMON *************************************/
router.get('/homepage/:userId/detail/:pokemonId', Controller.detailPokemon)

/******************************** DELETE POKEMON *************************************/
router.get('/deletePokemon', Controller.deletePokemonFromPokedex)



//render pokedex, dan update ketika ada pokemon yang dihapus dari pokedex
router.get('/pokedex', (req, res) => {res.render('pokedex')})
router.post('/pokedex', (req, res) => {res.redirect('/pokedex')})

//edit user
router.get('/editUser', (req, res) => {res.render('editUser')})
router.post('/editUser', (req, res) => {res.redirect('/pokedex')})

//log out
router.get('/logOut', (req, res) => {res.redirect('/')})



module.exports = router