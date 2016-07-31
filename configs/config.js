let config = {}

switch (process.env.NODE_ENV) {
    case 'development':
        config = {
          api_prefix: '/api/v1/public'
        }
        break
    case 'staging':
        config = {
          api_prefix: '/api/v1/public'
        }
        break
    default:
        config = {
          api_prefix: '/api/v1/public'
        }
        break
}

export default config
