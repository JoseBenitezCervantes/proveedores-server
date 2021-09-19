exports.listPath = [
  {
    requestFront: "/getUsers",
    responseMiddleware: "https://reqre.in/api/users?page=2", //Usar ENV
    // responseMiddleware: "https://mock.codes/403", //Usar ENV
  },
];
