const express = require('express')
const { CreateProperty,AllProperty, SingleProperty,UpdateProperty, getSellerDetails,DeleteProperty, UserProperties } = require('../../controller/property/propertyController')
const propertyRoutes = express.Router()
const authMiddleware= require('../../middleware/AuthMiddleware')
propertyRoutes.post('/create',authMiddleware, CreateProperty)
propertyRoutes.get('/',authMiddleware, AllProperty)
propertyRoutes.get('/:id',authMiddleware, SingleProperty)
propertyRoutes.put('/:id',authMiddleware,UpdateProperty)
propertyRoutes.delete('/:id',authMiddleware,DeleteProperty)
propertyRoutes.get('/seller/:propertyId', getSellerDetails)
propertyRoutes.get('/user/:userId', authMiddleware, UserProperties);
module.exports = propertyRoutes;