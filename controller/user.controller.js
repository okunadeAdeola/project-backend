const validationModel = require('../model/user.model');
const bcryptjs = require('bcryptjs');

// Register User
const registeredStudent = async (req, res) => {
    const user = req.body;
    try {
        const newUser = new validationModel(user);
        await newUser.save();
        res.status(200).json({ status: 200, message: 'User saved successfully' });
    } catch (err) {
        if (err.code === 11000) {  // Handle duplicate key error
            return res.status(400).json({ status: 400, message: 'Email already exists' });
        }
        res.status(500).json({ status: 500, message: 'Error registering user' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await validationModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 401, message: 'User not found' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }

        res.status(200).json({ status: 200, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await validationModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            status: 200,
            message: 'Redirecting to reset password page',
            userId: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
       
        const user = await validationModel.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log(password);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        await user.save();
        res.status(200).json({ status: 200, message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = {
    registeredStudent,
    loginUser,
    forgotPassword,
    resetPassword
};
