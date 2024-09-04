import axios from 'axios';
import { validSnippet, invalidSnippetFixtures } from './fixtures/snippetFixtures';
import SnippetModel from '../Models/SnippetModel';
import { stringify } from 'flatted';

const baseURL = 'http://localhost:4000/api/snippet';



describe('Snippet API', () => {
  it('should create a snippet successfully with valid data', async () => {
    
    const response = await axios.post(`${baseURL}/snippets`, validSnippet);

    expect(response.status).toBe(201);
    expect(response.data.message).toBe('Snippet created successfully.');
    expect(response.data.snippet).toHaveProperty('title', validSnippet.title);
    expect(response.data.snippet).toHaveProperty('description', validSnippet.description);

    await axios.delete(`${baseURL}/snippets`,{ params: {id: response.data.snippet._id} });
  });

  invalidSnippetFixtures.forEach(({ name, data, expectedStatus, expectedError }) => {
    it(`should fail to create a snippet when ${name}`, async () => {
      try {
        await axios.post(`${baseURL}/snippets`, data);
      } catch (error) {

        expect(error.response.status).toBe(expectedStatus);
        expect(error.response.data.message).toBe(expectedError);
      }
    });
  });
});
