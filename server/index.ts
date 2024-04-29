import { createExpressApp } from 'remix-express-vite-plugin/express'
import compression from 'compression'
import morgan from 'morgan'
import { RequestHandler } from 'express'

// update the AppLoadContext interface used in your app
declare module '@remix-run/node' {
  interface AppLoadContext {
    hello: () => string
  }
}

const rootRoute: RequestHandler = (req, res) => {
  const { name } = req.query
  const message = name ? `Hello ${name}` : 'Express API'
  res.json({ message })
}

export default createExpressApp({
  configure: app => {
    // setup additional express middleware here
    app.use(compression())
    app.disable('x-powered-by')
    app.use(morgan('tiny'))

    app.get('/api', rootRoute)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLoadContext: async (req, res) => {
    // custom load context should match the AppLoadContext interface defined above
    return { hello: () => 'Hello, Paulo!' }
  },
})

