import _ from 'lodash';

export function handleErrors(req, res, err) {
    if (process.env.NODE_ENV === 'local') {
        res.status(400).json(err);
    } else {
        console.error(`Có lỗi xảy ra ở `, req.method, req.originalUrl, err, err.stack);
        if (err && err.name) {
            let message = '';
            switch (err.name) {
                case 'SequelizeValidationError':
                    message = _.reduce(err.errors, (res, error) => {
                        return `${res}${error.message}`;
                    }, '');
                    break;
                case 'Error':
                    message = `Có lỗi xảy ra: ${err.message}`;
                    break;
                default:
                    message = `Có lỗi xảy ra: ${err.name}`;
                    break;
            }
            res.status(400).json({
                message: message
            });
        } else {
            res.status(400).json({
                message: 'Có lỗi xảy ra, vui lòng thử lại sau'
            });
        }
    }
}
