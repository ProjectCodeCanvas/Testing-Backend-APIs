import axios from 'axios';
import { validUser, invalidUserFixtures, othervalidUser, invalidLoginFixtures, validLogin } from './fixtures/userFixtures.js';
import { UserModel } from '../Models/UserModel.js';

const baseURL = 'http://localhost:4000/api/user';

describe('User Signup API', () => {
    it('should create a user successfully with valid data', async () => {
   
        const response = await axios.post(`${baseURL}/createUser`, validUser);
        
        expect(response.status).toBe(201);
        expect(response.data.message).toBe('User created successfully.');
        expect(response.data.user).toHaveProperty('_id');
        expect(response.data.user).toHaveProperty('Email', validUser.email);
    });

    invalidUserFixtures.forEach(({ name, data, expectedError }) => {
        it(`should fail to create a user when ${name}`, async () => {
          try {
            await axios.post(`${baseURL}/createUser`, data);
          } catch (error) {
            
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe(expectedError);
          }
        });
      });
    

    it('should not allow creating a user with the same email twice', async () => {
        try {
            await axios.post(`${baseURL}/createUser`, othervalidUser);
            await axios.post(`${baseURL}/createUser`, othervalidUser);
        } catch (error) {
            expect(error.response.status).toBe(409);
            expect(error.response.data.message).toBe('Email already exists.');
        }
    });
});


describe('User Login API', () => {
  it('should log in successfully with valid credentials', async () => {
      const response = await axios.post(`${baseURL}/loginuser`, validLogin);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Successful login');
      expect(response.data.token).toBeDefined(); // Check that the token is returned
  });

  invalidLoginFixtures.forEach(({ name, data, expectedStatus, expectedError }) => {
      it(`should fail to log in when ${name}`, async () => {
          try {
              await axios.post(`${baseURL}/loginuser`, data);
          } catch (error) {
              expect(error.response.status).toBe(expectedStatus);
              expect(error.response.data.message).toBe(expectedError);
          }
      });
  });
});