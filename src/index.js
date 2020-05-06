const app = require('./../src/server/server');
const {serverSettings} = require('./../src/db/config');

const port = serverSettings.port;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));