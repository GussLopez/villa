import { CorsOptions } from "cors";

export const corsCofnig: CorsOptions = {
    origin: function(origin, callback) {
        const whiteList = [process.env.DATABASE_URL]

        if (process.argv[2] === '--api') {
            whiteList.push(undefined)
        }

        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Errors de CORS'))
        }
    }
}