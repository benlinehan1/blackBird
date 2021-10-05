exports.port = process.argv[2] || 3000
exports.sMsg = {
    req: (req, res = undefined, next) => {
        console.log(`${new Date().toLocaleString()} - Req - ${req.method} - "${req.url}" `)
        next()
    },
    startup: (port) => {
        console.log(`--- server listening at port ${port} ---`)
    }
}
exports.startup = (port) => {
    this.sMsg.startup(port)
}