const createService = require("./createAccountService");
const createArticleService = require("./createArticleService");

const PORT_CREATE = 5003;
const PORT_NEWARTICLE = 5005;

createService.listen(PORT_CREATE, () => {
  console.log(`Account Service is running on port ${PORT_CREATE}`);
});

createArticleService.listen(PORT_NEWARTICLE, () => {
  console.log(`Article Service is running on port ${PORT_NEWARTICLE}`);
});
