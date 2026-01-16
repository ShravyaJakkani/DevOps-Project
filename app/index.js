const express = require('express');
const app = express();
const port = 3000;

const dashboard = {
  project: "CI/CD Progress Dashboard",
  status: "Development",
  dockerImage: "Not built yet",
  lastBuild: "N/A",
  deployedOn: "Local Machine"
};

app.get('/', (req, res) => {
  res.json(dashboard);
});

app.listen(port, () => {
  console.log(`Dashboard running on port ${port}`);
});
