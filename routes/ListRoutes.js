exports.listPath = [
  {
    requestFront: "/getUsers",
    resolveMiddleware: "https://reqres.in/api/users?page=2", //Usar ENV
    methodResolve: "GET"
    // responseMiddleware: "https://mock.codes/403", //Usar ENV
  },
  {
    requestFront: "/insertUsers",
    resolveMiddleware: "https://reqres.in/api/users", //Usar ENV
    methodResolve: "POST"
    // responseMiddleware: "https://mock.codes/403", //Usar ENV
  },
];
