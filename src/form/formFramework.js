export function creatControl(config, validation) {
    return {
      ...config,
      validation,
      valid: !validation,
      touched: false,
      value: ''
    }
  }