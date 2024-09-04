
import createSampleSnippets from './dummyData';
import SnippetModel from '../Models/SnippetModel';
import { negativeFilters, positiveFilters } from './fixtures/snippetFixtures';
import axios from 'axios';
import { UserModel } from '../Models/UserModel';
import mongoose from 'mongoose';

const baseURL = 'http://localhost:4000/api/snippet';


describe('GET /snippets with filters', () => {

  // Positive Test Cases
  positiveFilters.forEach(({ name, query, expectedCount }) => {
    it(`should return snippets when ${name}`, async () => {
      const response = await axios.get(`${baseURL}/snippets/search`,{ params: query });
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(expectedCount);
    });
  });

  // Negative Test Cases
  negativeFilters.forEach(({ name, query, expectedError, expectedCount }) => {
    it(`should handle error or empty results when ${name}`, async () => {
      try {
        await axios.get(`${baseURL}/snippets/search`,{ params: query });
      } catch (error) {   
        expect(error.response.status).toBe(400);
        expect(error.response.data.message).toBe(expectedError);
      }
    });
  });
});
