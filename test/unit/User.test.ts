import User from "../../src/domain/entity/User";


test("Não deve criar um usuario", function () {
  
  expect(() =>  new User("aaaa", "aaaa",  undefined)).toThrow(new Error("Invalid email"));
  
});