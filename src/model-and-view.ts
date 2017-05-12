class ModelAndView {
  viewPath: string
  modelData: any
  constructor(viewPath: string, modelData?: any) {
    this.viewPath = viewPath
    this.modelData  = modelData
  }
}

export default ModelAndView