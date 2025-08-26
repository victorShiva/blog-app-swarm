import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.set('view engine', 'ejs')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT title, description FROM blogs')
        res.render('index', { blogs: rows , version: 'v1', host: process.env.NODE_HOST || 'unknown'})
    } catch (error) {
        console.error(error)
        res.status(500).send('Error retrieving blog posts')
    }
})

app.get('/health', (req,res)=>{
    console.log(`Checking health through endpoint...`)
    return res.json({alive:true})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
