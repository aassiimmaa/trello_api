/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    // production environment
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Hello ${env.AUTHOR}, I am running in production mode at Port: ${process.env.PORT}/`
      )
    })
  } else {
    // local development environment
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Hello ${env.AUTHOR}, I am running at ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
      )
    })
  }


  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('connected to MongoDB'))
  .then(() => START_SERVER())
  .catch(error => {
    console.log(error)
    process.exit(0)
  })
