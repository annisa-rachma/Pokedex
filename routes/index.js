const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

/******************************** SIGN UP *************************************/
router.get('/addUser', Controller.registerForm)
router.post('/addUser', Controller.postRegister)

/******************************** LOG IN *************************************/
router.get('/', Controller.logInForm)
router.post('/', Controller.postForm)

/******************************** LOG OUT *************************************/
router.get('/logOut', Controller.logout)

/******************************** MIDDLEWARE *************************************/
router.use((req, res, next) => {
    if(!req.session.idUser){
        let errors = 'Please login first!'

        res.redirect(`/?errors=${errors}`)
    } else {
        next()
    }
})

/******************************** HOME *************************************/
router.get('/homepage/:userId', Controller.home)

/******************************** ADD POKEMON *************************************/
router.get('/homepage/:userId/addPokemon/:pokemonId', Controller.addPokemonToPokedex)

/******************************** DETAIL POKEMON *************************************/
router.get('/homepage/:userId/detail/:pokemonId', Controller.detailPokemon)

/******************************** POKEDEX *************************************/
router.get('/pokedex/:userId', Controller.showPokedex)
// router.post('/pokedex/:userId', (req, res) => {res.redirect('/pokedex')})

/******************************** DELETE POKEMON *************************************/
router.get('/homepage/:userId/delete/:pokemonId', Controller.deletePokemonFromPokedex)


//edit user
router.get('/homepage/:userId/editUser', Controller.editUserFrom)
router.post('/homepage/:userId/editUser', Controller.postEditUserForm)





module.exports = router