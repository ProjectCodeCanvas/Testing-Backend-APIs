import express from 'express';
import { verifyToken } from '../Middlewares/UserMiddleware.js';
import { createSnippet, getSnippet, getAllSnippets, likeOrDislikeSnippet, getSnippetsByFilters, deleteSnippet } from '../Controllers/SnippetController.js';
import { isValidNewSnippetData, validateSnippetFilters } from '../Middlewares/ValidInputMiddleware.js';


const router = express.Router();

router.post('/snippets', verifyToken, isValidNewSnippetData, createSnippet); // Create a snippet
// router.get('/snippets/:id', getSnippet); // Get a single snippet
router.get('/snippets', getAllSnippets); // Get all snippets
router.patch('/snippets/:id/like', verifyToken, likeOrDislikeSnippet); // Like or dislike a snippet
router.get('/snippets/search', validateSnippetFilters, getSnippetsByFilters); // Get snippets by filters
router.delete('/snippets', deleteSnippet); // Get snippets by filters

export { router as snipperRouter };
