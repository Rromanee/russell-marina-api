const User = require('../models/User');
const jwt = require('jsonwebtoken');


// REGISTER
exports.register = async (req, res) => {

  try {

    console.log(req.body);

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Utilisateur déjà existant'
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};


// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Utilisateur introuvable'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Mot de passe incorrect'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true
    });
    
    if (req.originalUrl.includes('/api/')) {

      return res.status(200).json({
        token
      });
    
    }

  } catch (error) {

    res.status(500).json(error);
  }

  res.redirect('/dashboard');
};