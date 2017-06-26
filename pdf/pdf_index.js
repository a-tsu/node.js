const server = require("./pdf_server");
const router = require("./pdf_router");
const requestHandlers = require("./requestHandlers");

const handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
