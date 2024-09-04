import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    language: {
        type: String,
        enum: ['html', 'css', 'react', 'node'],
        required: true,
    },
    category: {
        type: String,
        enum: ['menubar', 'navbar', 'button', 'card', 'sidebar'],
        required: true,
    },
    contributedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'UserModel',
        default: [],
    },
    publicity: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    }
}, { timestamps: true });

const SnippetModel = mongoose.model('Snippet', snippetSchema);
export default SnippetModel;
