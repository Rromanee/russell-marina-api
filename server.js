require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

const { exec } = require('child_process');

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

  exec('npm test', (error, stdout, stderr) => {

    console.log(stdout);

    if (stderr) {
      console.log(stderr);
    }

  });

});
