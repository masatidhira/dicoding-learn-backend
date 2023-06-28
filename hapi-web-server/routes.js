const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "HOMEPAGE";
    },
  },
  {
    method: "*",
    path: "/",
    handler: (request, h) => {
      return "Halaman tidak dapat diakses";
    },
  },
  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name = "Stranger" } = request.params;
      const { lang } = request.query;

      // Jika path = 'http://localhost:5000/hello/{name}?lang=id
      if (lang === "id") return `Hai, ${name}!`;
      return `Hello, ${name}!`;
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: (request, h) => {
      // Mengakses data login dari payload JSON
      const { username, password } = request.payload;
      return `Welcome ${username}!`;
    },
  },
  {
    method: "GET",
    path: "/{any*}",
    handler: (request, h) => {
      return "Halaman tidak ditemukan";
    },
  },
];

module.exports = routes;
