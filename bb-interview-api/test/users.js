import supertest from 'supertest';
const request = supertest('https://candidatex:qa-is-cool@qa-task.backbasecloud.com/api');

import { expect } from 'chai';

const TOKEN= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGNlOTMxZjcyZWQwMjcwNmFkNWI4MyIsInVzZXJuYW1lIjoiY2hyaXN0aW5lIiwiZXhwIjoxNjQxOTAwMTYzLCJpYXQiOjE2MzY3MTYxNjN9.x8PxPCyNIBiBGbUzRpCc-DJ19Aq2pm5QyU8C5rEAdug';


describe('Users', () => {
  it('Login', () => {
      const data = {
        user: {
          email: 'tinaonyango@gmail.com',
          password: 'Password1*'
        }
      };
      return request
        .post('/users/login')
        .send(data)
        .then((res) => {
          //console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body.user.username).to.be.eq('hau');
          expect(res.body).to.include.keys('user');

        });
    });

  it('Update User should be successful', () => {
    const data = {
        user:{
          email: 'tinaonyango@gmail.com',
          bio: 'I like to skateboard',
          image: 'https://i.stack.imgur.com/xHWG8.jpg'
        }
      };

    return request
      .put('/user')
      .set('jwtauthorization', 'Token ' + TOKEN)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.user.username).to.be.eq( 'hau');
        expect(res.body).to.include.keys('user')
        //console.log(res.body);

      });
      
  });

  it('Updating a user should require authorization', () => {
    const data = {
        user:{
          email: 'tinaonyango@gmail.com',
          bio: 'I like to skateboard',
          image: 'https://i.stack.imgur.com/xHWG8.jpg'
        }
      };

    return request
      .put('/user')
      .send(data)
      .then((res) => {
        //console.log(res.body);
        expect(res.status).to.equal(401);

      });
    });

  it('Registration should be successful ', () => {
    const data = {
        user:{
          username: 'hau99',
          email: 'hallo@hallo.com',
          password: 'Password1*'
        }
      };

    return request
      .post('/users')
      .set('jwtauthorization', 'Token ' + TOKEN)
      .send(data)
      .then((res) => {
      //console.log(res.body);
        expect(res.status).to.equal(422);
      });
  });
  it('Registration should validate email format', () => {
    const data = {
        user:{
          username: 'hau99',
          email: 'hau@hau',
          password: 'Password1*'
        }
      };

    return request
      .post('/users')
      .set('jwtauthorization', 'Token ' + TOKEN)
      .send(data)
      .then((res) => {
        //console.log(res.body);
        expect(res.status).to.equal(422);
      });
  });

  it('Delete Articles', () => {
    return request
      .delete('DELETE articles/:bla-is-the-bla-of-bla-and-bla-w4yhpz')
      .set('jwtauthorization', 'Token ' + TOKEN)
      .then((res) => {
        //console.log(res.body);
        expect(res.status).to.equal(404);
       
      });
  });
});


//Pending. Reports, random email and string generator