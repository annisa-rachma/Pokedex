const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

/******************************** SIGN UP *************************************/
router.get('/addUser', Controller.registerForm)
router.post('/addUser', Controller.postRegister)

/******************************** LOG IN *************************************/
router.get('/', Controller.logInForm)
router.post('/', Controller.postForm)


//tampilin home
router.get('/homepage/:userId', Controller.home)

//add pokemon ke pokedex(tombol ada di home dan detail pokemon)
router.get('/addPokemon', Controller.addPokemonToPokedex)
router.get('/deletePokemon', Controller.deletePokemonFromPokedex)

//di home ketika klik pokemon, akan menampilkan detail
router.get('/detail/:id', Controller.detailPokemon)

//render pokedex, dan update ketika ada pokemon yang dihapus dari pokedex
router.get('/pokedex', (req, res) => {res.render('pokedex')})
router.post('/pokedex', (req, res) => {res.redirect('/pokedex')})

//edit user
router.get('/editUser', (req, res) => {res.render('editUser')})
router.post('/editUser', (req, res) => {res.redirect('/pokedex')})

//log out
router.get('/logOut', (req, res) => {res.redirect('/')})



module.exports = router