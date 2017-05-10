import Spring from './src/spring'
import * as path from 'path'
const app = new Spring(path.join(__dirname, './example'))
app.listen(3000)