export const isValidInputForNewUserMiddleware = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Validate name
    if (typeof name !== 'string' || name.length < 2 || name.length > 50) {
        return res.status(400).json({ message: 'Name must be a string between 2 and 50 characters.' });
    }

    // Validate email using a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (typeof password !== 'string' || !passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.' 
        });
    }

    // If all validations pass, move to the next middleware
    next();
};


export const isValidInputForLoginMiddleware = async (req, res, next) => {
    const {  email, password } = req.body;
    
    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'email, and password are required.' });
    }

    // Validate email using a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // If all validations pass, move to the next middleware
    next();
};


export const isValidNewSnippetData = (req, res, next) => {
    const { title, description, language, category, publicity } = req.body;
  
    // Define valid options for language, category, and publicity
    const validLanguages = ['html', 'css', 'javascript', 'react', 'node'];
    const validCategories = ['navbar', 'menubar', 'button', 'card', 'sidebar'];
    const validPublicityOptions = ['public', 'private'];
  
    // Check for presence of required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }
  
    if (!description) {
      return res.status(400).json({ message: 'Description is required.' });
    }
  
    if (!language) {
      return res.status(400).json({ message: 'Language is required.' });
    }
  
    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }
  
    if (!publicity) {
      return res.status(400).json({ message: 'Publicity is required.' });
    }
  
    // Validate the values of language, category, and publicity
    if (!validLanguages.includes(language)) {
      return res.status(400).json({ message: 'Invalid language value.' });
    }
  
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category value.' });
    }
  
    if (!validPublicityOptions.includes(publicity)) {
      return res.status(400).json({ message: 'Invalid publicity value.' });
    }
  
    // If all validations pass, proceed to the next middleware or controller
    next();
  };


  const validCategories = ['menubar', 'navbar', 'button', 'card', 'sidebar'];
  const validLanguages = ['html', 'css', 'react', 'node'];
  
 export const validateSnippetFilters = (req, res, next) => {
      const { minViews, minLikes, category, language, contributedBy } = req.query;
  
      // Check if minViews is a valid number
      if (minViews !== undefined && isNaN(Number(minViews))) {
          return res.status(400).json({ message: 'Invalid type for minViews, expected a number.' });
      }
  
      // Check if minLikes is a valid number
      if (minLikes !== undefined && isNaN(Number(minLikes))) {
          return res.status(400).json({ message: 'Invalid type for minLikes, expected a number.' });
      }
  
      // Check if category is valid
      if (category && !validCategories.includes(category)) {
          return res.status(400).json({ message: `Invalid category. Valid options are: ${validCategories.join(', ')}.` });
      }
  
      // Check if language is valid
      if (language && !validLanguages.includes(language)) {
          return res.status(400).json({ message: `Invalid language. Valid options are: ${validLanguages.join(', ')}.` });
      }
  
      // Check if contributedBy is a valid ObjectId
      if (contributedBy && !mongoose.Types.ObjectId.isValid(contributedBy)) {
          return res.status(400).json({ message: 'Invalid contributedBy ID format.' });
      }
  
      // If all checks pass, proceed to the next middleware or route handler
      next();
  };
  
  
  