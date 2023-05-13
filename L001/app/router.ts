const { getRequestData } = require("./utils");
const { animalsArray } = require("./model");
const controller = require("./controller");
const fs = require("fs");
const path = "./app/views/";

const router = async (request, response) => {
  switch (request.method) {
    case "GET":
      if (request.url === "/") {
        fs.readFile(path + "index.html", function (error, data) {
          if (error) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write("<h1>błąd 404 - nie ma pliku!<h1>");
            response.end();
          } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            response.end();
          }
        });
      }
    // strona views/index.html

    case "POST":
      if (request.url == "/add") {
        // odczytaj dane z body
        // użyj funkcji z controllera
        // odpowiedz do klienta
        let data = await getRequestData(request);
        controller.add(data.name, data.color);
        response.end(JSON.stringify(animalsArray));
      } else if (request.url == "/getall") {
        //  pobierz dane z tablicy zwierząt i odpowiedz do klienta
      } else if (request.url == "/delete") {
        //  usuń dane z tablicy zwierząt i odpowiedz do klienta
      } else if (request.url == "/update") {
        //  updatuj danye z tablicy zwierząt i odpowiedz do klienta
      }

      break;
  }
};

module.exports = router;
