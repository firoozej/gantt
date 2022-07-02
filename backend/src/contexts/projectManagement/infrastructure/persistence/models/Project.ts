import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    predictedEnd: {
        type: Date,
    },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export { Project };
