/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import {object, number, string, boolean} from 'yup'

const todosSchema = object({
  _id: number().positive().integer().required(),
  description: string().required(),
  user_id: string().required(),
  done: boolean().required()
}

)


// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todosSchema})

// bind to serverless runtime
export default app.init();
