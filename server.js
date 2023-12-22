require('dotenv').config()
const express = require('express') // imported express from node modules
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const Fruit = require('./models/fruit')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended:true })) // build an SSR website
// app.use(express.json()) build an api

// Query to override a method
app.use(methodOverride('_method'))

// Set up the view engine
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
})

// INDUCES //

// INDEX
    // Show a list of all of the fruits
app.get('/fruits', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({})
        res.render('fruits/Index', {
            fruits: foundFruits
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }    
})

// NEW
    // Show the user a form to fill out to create a fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})

// DELETE
    // Backend only functionality that is used to delete a fruit
app.delete('/fruits/:id', async (req, res) => {
    try {
        await Fruit.findOneAndDelete({ '_id': req.params.id })
            .then(() => {
                res.redirect('/fruits')
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// UPDATE
    // Backend only functionality that is used to update a fruit
app.put('/fruits/:id', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    }else{
        req.body.readyToEat = false
    }
    try {
        await Fruit.findOneAndUpdate({ '_id': req.params.id }, 
            req.body, { new: true })
            .then(() => {
                res.redirect('/fruits/${req.params.id}')
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// CREATE
    // Backend only functionality that is used to create a fruit
app.post('/fruits', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    }else{
        req.body.readyToEat = false
    }
    try{
        const createdFruit = await Fruit.create(req.body)
        res.redirect(`/fruits/${createdFruit._id}`)
    }catch(error){
        res.status(400).send({message: error.message})
    }
})

// EDIT
    // Show you a form that lets you edit the fruit

// SHOW
    // Shows you 1 individual fruit
app.get('/fruits/:id', async (req, res) => {
    try {
        const foundFruit = await Fruit.findOne({_id: req.params.id})
        res.render('fruits/Show', {
            fruit: foundFruit
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Connect App to open PORT or 3000 as stated above in PORT variable
app.listen(PORT, () => { 
    console.log(`The Port at ${PORT} is ACTIVE`)
})