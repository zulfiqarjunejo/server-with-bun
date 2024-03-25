import figlet from "figlet";
import { handleScore } from "./score";

const handleRoot = () => {
    return new Response("Root")
};

const server = Bun.serve({
    port: process.env.PORT,
    async fetch(req: Request) {
        const path = new URL(req.url).pathname;
        let response: Response;
        switch(path) {
            case "/score":
                response = handleScore();
                break
            case "/":
                response = handleRoot();
                break
            default:
                throw new Error("route not allowed");
        }

        return response;
    },
    error(error) {
        return new Response("Unexpected Error: " + error.message)
    },
});

const welcomeText = "Welcome to server-with-bun";
console.log(figlet.textSync(welcomeText));
console.log(`Listening on http://localhost:${server.port} ...`);