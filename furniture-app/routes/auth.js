const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Page de connexion (GET)
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Traitement du login (POST)
router.post('/login', async (req, res) => {
  console.log('↗️  POST /login body =', req.body);
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  console.log('🔍 user trouvé =', user);

  if (user) {
    const isMatch = await user.comparePassword(password);
    console.log('🔐 Mot de passe correspond ?', isMatch);

    if (isMatch) {
      req.session.userId = user._id;
      return res.redirect('/dashboard');
    }
  }

  res.render('login', { error: 'Identifiants incorrects' });
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
