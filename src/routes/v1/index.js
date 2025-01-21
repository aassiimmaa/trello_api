import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'


const router = express.Router()

router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

// boards API
router.use('/boards', boardRoute)

// columns API
router.use('/columns', columnRoute)

// cards API
router.use('/cards', cardRoute)

export const APIs_V1 = router
