const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
require('dotenv').config()
const posts = [
  {
    name: "Hari",
    title: "Welcome Hari"
  },
  {
    name: "CBIT",
    title: "Welcome from CBIT"
  }
]

const authenticateToken=(req, res, next)=> {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) 
    {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}
app.post('/login', (req, res) => {
    const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
  
  res.json({ accessTokenis: accessToken})
})
app.use(authenticateToken)
  app.get('/posts',(req, res) => {
  console.log(req.user.name)
  res.json(posts.filter(post => post.name === req.user.name))
  
})
app.listen(3000);
