export const validUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'Password123!'
};
export const othervalidUser = {
    name: 'John Doe 2',
    email: 'johndoe2@example.com',
    password: 'Password123!'
};

export const invalidUserFixtures = [
    {
      "name": "missing all fields",
      "data": {},
      "expectedError": "Name, email, and password are required."
    },
    {
      "name": "missing name",
      "data": { "email": "test@example.com", "password": "Password123!" },
      "expectedError": "Name, email, and password are required."
    },
    {
      "name": "missing email",
      "data": { "name": "Valid Name", "password": "Password123!" },
      "expectedError": "Name, email, and password are required."
    },
    {
      "name": "missing password",
      "data": { "name": "Valid Name", "email": "test@example.com" },
      "expectedError": "Name, email, and password are required."
    },
    {
      "name": "invalid name length",
      "data": { "name": "A", "email": "test@example.com", "password": "Password123!" },
      "expectedError": "Name must be a string between 2 and 50 characters."
    },
    {
      "name": "name too long",
      "data": { "name": "A".repeat(51), "email": "test@example.com", "password": "Password123!" },
      "expectedError": "Name must be a string between 2 and 50 characters."
    },
    {
      "name": "invalid email format",
      "data": { "name": "Valid Name", "email": "invalid-email", "password": "Password123!" },
      "expectedError": "Invalid email format."
    },
    {
      "name": "email missing domain",
      "data": { "name": "Valid Name", "email": "test@", "password": "Password123!" },
      "expectedError": "Invalid email format."
    },
    {
      "name": "invalid password format",
      "data": { "name": "Valid Name", "email": "test@example.com", "password": "password" },
      "expectedError": "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
    },
    {
      "name": "password missing uppercase letter",
      "data": { "name": "Valid Name", "email": "test@example.com", "password": "password1!" },
      "expectedError": "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
    },
    {
      "name": "password missing special character",
      "data": { "name": "Valid Name", "email": "test@example.com", "password": "Password1" },
      "expectedError": "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
    }
    
  ]
  
  
  export const validLogin = {
    email: 'johndoe@example.com',
    password: 'Password123!'
};

export const invalidLoginFixtures = [
  {
      "name": "missing email",
      "data": { "password": "Password123!" },
      "expectedStatus": 400,
      "expectedError": "email, and password are required."
  },
  {
      "name": "missing password",
      "data": { "email": "johndoe@example.com" },
      "expectedStatus": 400,
      "expectedError": "email, and password are required."
  },
  {
      "name": "invalid email format",
      "data": { "email": "invalid-email", "password": "Password123!" },
      "expectedStatus": 400,
      "expectedError": "Invalid email format."
  },
  {
      "name": "incorrect password",
      "data": { "email": "johndoe@example.com", "password": "WrongPassword" },
      "expectedStatus": 401,
      "expectedError": "Invalid credentials."
  },
  {
      "name": "user not found",
      "data": { "email": "nonexistent@example.com", "password": "Password123!" },
      "expectedStatus": 404,
      "expectedError": "User not found."
  }
];