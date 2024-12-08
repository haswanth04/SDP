import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from './models/Employee.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(cors());

// Use the MongoDB URI from the .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer with better error handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only .pdf, .doc and .docx files are allowed'));
        }
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        });
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { email, title } = req.body;
        if (!email || !title) {
            return res.status(400).json({ error: 'Email and title are required' });
        }

        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
        user.resumes.push({
            title,
            filename: req.file.filename,
            fileUrl,
            uploadDate: new Date(),
            status: 'active'
        });

        await user.save();
        res.json({ 
            message: 'Resume uploaded successfully',
            resume: user.resumes[user.resumes.length - 1]
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message || 'Failed to upload resume' });
    }
});

app.get('/resumes', async (req, res) => {
    try {
        const { email } = req.headers;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.resumes);
    } catch (error) {
        console.error('Fetch resumes error:', error);
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
});

app.delete('/resume/:id', async (req, res) => {
    try {
        const { email } = req.headers;
        const resumeId = req.params.id;
        
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resume = user.resumes.find(r => r._id.toString() === resumeId);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Delete file from uploads directory
        const filePath = path.join(uploadsDir, resume.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        user.resumes = user.resumes.filter(r => r._id.toString() !== resumeId);
        await user.save();
        
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Delete resume error:', error);
        res.status(500).json({ error: 'Failed to delete resume' });
    }
});

// Serve uploaded files with proper headers
app.use('/uploads', (req, res, next) => {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment');
    next();
}, express.static(uploadsDir));

// Add this middleware to check authentication for resume-related routes
const checkAuth = async (req, res, next) => {
    const email = req.headers.email;
    if (!email) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authentication error' });
    }
};

// Apply the middleware to resume routes
app.use(['/resumes', '/upload-resume', '/resume'], checkAuth);

app.listen(3001, () => {
    console.log("Server is running");
});
