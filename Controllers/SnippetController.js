import SnippetModel from "../Models/SnippetModel.js";


// Create a snippet
export const createSnippet = async (req, res) => {
    const { title, description, language, category, publicity } = req.body;
    let contributedBy;
    if(process.env.isTesting === 'true'){
        contributedBy = "66ce0c5a47774760da81a813";
    }else{

         contributedBy = req.user;
    }
    try {
        const newSnippet = new SnippetModel({
            title,
            description,
            language,
            category,
            contributedBy,
            publicity
        });

        await newSnippet.save();
        res.status(201).json({ message: 'Snippet created successfully.', snippet: newSnippet });
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating snippet.' });
    }
};

// Get a single snippet by ID
export const getSnippet = async (req, res) => {
    const { id } = req.params;

    try {
        const snippet = await SnippetModel.findById(id);
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found.' });
        }

        // Increment view count
        snippet.views += 1;
        await snippet.save();

        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching snippet.' });
    }
};

// Get all snippets
export const getAllSnippets = async (req, res) => {
    try {
        const snippets = await SnippetModel.find({ publicity: 'public' });
        res.status(200).json(snippets);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching snippets.' });
    }
};

// Like or Dislike a snippet
export const likeOrDislikeSnippet = async (req, res) => {
    const { id } = req.params;
    const userId = req.user;

    try {
        const snippet = await SnippetModel.findById(id);
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found.' });
        }

        if (snippet.likes.includes(userId)) {
            // If already liked, remove the like
            snippet.likes = snippet.likes.filter(like => like.toString() !== userId.toString());
            await snippet.save();
            return res.status(200).json({ message: 'Snippet disliked.' });
        } else {
            // Otherwise, add the like
            snippet.likes.push(userId);
            await snippet.save();
            return res.status(200).json({ message: 'Snippet liked.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating snippet likes.' });
    }
};

// Get snippets by filters
export const getSnippetsByFilters = async (req, res) => {
    const { name, contributor, minViews, minLikes, language, category } = req.query;
    const filter = { publicity: 'public' };
    if (name) {
        filter.title = { $regex: name, $options: 'i' }; // Case-insensitive search by name
    }
    if (contributor) {
        filter.contributedBy = contributor;
    }
    if (minViews) {
        filter.views = { $gte: Number(minViews) };
    }
    if (minLikes) {
        filter.likes = { $exists: true, $not: {$size: 0} };
        filter.$expr = { $gte: [{ $size: "$likes" }, Number(minLikes)] };
    }    
    if (category) {
        filter.category = category;
    }
    if(language) {
        filter.language = language;
    }

    try {
        const snippets = await SnippetModel.find(filter);
        res.status(200).json(snippets);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching filtered snippets.' });
    }
};

export const deleteSnippet = async(req,res) => {
    try {
        const {id} = req.query;
        await SnippetModel.findByIdAndDelete(id);
        res.status(203).json({message:"deleted success"});
    } catch (error) {
        res.status(400).json({error});
        
    }
}