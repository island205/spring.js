import decorators from './decorators'
import ModelAndView from './model-and-view'
import Model from './model'

export default Object.assign(
  {},
  decorators,
  {
    Model,
    ModelAndView
  }
)