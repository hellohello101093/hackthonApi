let config = {}

switch (process.env.NODE_ENV) {
    case 'development':
        config = {
            host : "localhost",
            port : 8125,
            enabled: true,
            prefix: 'shop_profile.'
        }
        break
    case 'staging':
        let server_ip = process.env.SERVER_IP
        config = {
            host : server_ip,
            port : 8125,
            enabled: true,
            prefix: 'shop_profile.'
        }
        break
    default:
        config = {
            host : "127.0.0.1",
            port : 8125,
            enabled: true,
            prefix: 'shop_profile.'
        }
        break
}

export default config
