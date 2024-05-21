const User = require("../../models/user")
const bcrypt = require('bcryptjs')
const UserRegister = async(req,res)=>{
    const {firstName,lastName,email,phone,password}= req.body
    try {
        if (!firstName||!lastName || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" });
          }
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Return success response
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const UserLogin = async(req,res)=>{
    const {email,password} = req.body
    try {
       // Check if the user exists in the database
       const user = await User.findOne({ email });
       if (!user) {
           return res.status(404).json({ message: "Email is not register" });
       }

       // Compare the provided password with the hashed password stored in the database
       const passwordMatch = await bcrypt.compare(password, user.password);
       if (!passwordMatch) {
           return res.status(401).json({ message: "Invalid credentials" });
       }

       // Set user session
       req.session.userId = user._id;

       // Return success response
       res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const UserUpdate = async(req,res)=>{
    // Extract the updated user data from the request body
    const { password } = req.body;
    try {

        // Ensure that the request contains the logged-in user's ID
        const userId = req.session.userId; // Assuming userId is stored in the session

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        // Find the user in the database using the extracted user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's information with the new data
        user.password = password;

        // Save the updated user data back to the database
        await user.save();

        // Return a success response
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const UserLogout = async (req, res) => {
    try {
        // Clear the session data
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            // Session destroyed successfully
            return res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const UserDelete = async(req,res)=>{
    try {
        
        const userId = req.session.userId; // Assuming userId is stored in the session

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        // Find the user in the database using the extracted user ID
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        // Return a success response
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    UserRegister,
    UserLogin,
    UserUpdate,
    UserLogout,
    UserDelete
}