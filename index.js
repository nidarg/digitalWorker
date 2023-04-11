

const path = require('path')
const express = require('express')
require('dotenv').config()

// extra security packages

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

require('express-async-errors')
const connectDB = require('./db/connectDB')

const app = express()

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const notFoundRouteMiddleware = require('./middleware/not-route-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const authRoutes = require('./routes/authRoutes')
const entriesRoutes = require('./routes/entriesRoutes')


app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
}))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }));

// app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "example.com"],
      "img-src": ["'self'", "https: data:"]
    }
  })
)
app.use(cors())
app.use(xss())

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/entries', entriesRoutes)

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
})

app.use(notFoundRouteMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()




