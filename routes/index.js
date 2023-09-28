const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')


//tampilin log in page, masukin data dari log in page
router.get('/', (req, res) => {res.render('login-page')})
router.post('/', (req, res) => {res.redirect('/homepage')})

//tampilin home
router.get('/homepage', Controller.home)

//add pokemon ke pokedex(tombol ada di home dan detail pokemon)
router.get('/addPokemon', Controller.addPokemon)
router.get('/deletePokemon', Controller.deletePokemon)


//di home ketika klik pokemon, akan menampilkan detail
router.get('/detail/:id', Controller.detailPokemon)

//render pokedex, dan update ketika ada pokemon yang dihapus dari pokedex
router.get('/pokedex', (req, res) => {res.render('pokedex')})
router.post('/pokedex', (req, res) => {res.redirect('/pokedex')})

//register page
router.get('/addUser', (req, res) => {res.render('signUp-page')})
router.post('/addUser', (req, res) => {res.redirect('/homepage')})

//edit user
router.get('/editUser', (req, res) => {res.render('editUser')})
router.post('/editUser', (req, res) => {res.redirect('/pokedex')})

//log out
router.get('/logOut', (req, res) => {res.redirect('/')})



module.exports = router