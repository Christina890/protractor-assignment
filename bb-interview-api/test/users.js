import supertest from "supertest";

const request = supertest(
  "https://candidatex:qa-is-cool@qa-task.backbasecloud.com/api"
);

import { expect } from "chai";

let token = "";
function generateString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const length = 6;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Users", () => {
  it("Login", () => {
    const data = {
      user: {
        email: "tinaonyango@gmail.com",
        password: "Password1*",
      },
    };
    return request
      .post("/users/login")
      .send(data)
      .then((res) => {
        token = res.body.user.token;
        expect(res.status).to.equal(200);
        console.log(res.body);

        expect(res.body.user.username).to.be.eq("hau");
        expect(res.body).to.include.keys("user");
      });
  });

  it("Update User should be successful", () => {
    const data = {
      user: {
        email: "tinaonyango@gmail.com",
        bio: "I like to skateboard",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
      },
    };

    return request
      .put("/user")
      .set("jwtauthorization", "Token " + token)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.user.username).to.be.eq("hau");
        expect(res.body).to.include.keys("user");
      });
  });

  it("Updating a user should require authorization", () => {
    const data = {
      user: {
        email: "tinaonyango@gmail.com",
        bio: "I like to skateboard",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
      },
    };

    return request
      .put("/user")
      .send(data)
      .then((res) => {
        expect(res.status).to.equal(401);
      });
  });

  it("Registration should be successful ", () => {
    const username = generateString();
    const data = {
      user: {
        username,
        email: `${username}@gmail.com`,
        password: "Password1*",
      },
    };

    return request
      .post("/users")
      .set("jwtauthorization", "Token " + token)
      .send(data)
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });
  it("Registration should validate email format", () => {
    const data = {
      user: {
        username: "hau99",
        email: "hau@hau",
        password: "Password1*",
      },
    };

    return request
      .post("/users")
      .set("jwtauthorization", "Token " + token)
      .send(data)
      .then((res) => {
        expect(res.status).to.equal(422);
      });
  });

  it("Delete Articles", () => {
    return request
      .delete("DELETE articles/:bla-is-the-bla-of-bla-and-bla-w4yhpz")
      .set("jwtauthorization", "Token " + token)
      .then((res) => {
        expect(res.status).to.equal(404);
      });
  });
});
