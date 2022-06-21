import app from "./app.js";
import { routes } from "./api/index.js";
import {
  internalServerErrorCreator,
  notFoundErrorCreator,
} from "./helpers/errors.js";

const PORT = app.get("port");
app.use(routes);
// handle 404 error
app.use((req, res, next) => {
  next(notFoundErrorCreator());
});

// handle errors
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const error = err.status ? err : internalServerErrorCreator();
  const status = error.status;

  console.log(error.stack);

  res.status(status).json(error);
});

app.listen(PORT, function () {
  console.log(
    `\n🚀 Server ready at: http://localhost:${this.address().port}\n`,
  );
});
