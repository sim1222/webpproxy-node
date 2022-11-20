import createError from 'http-errors';
import express, {Application, Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from "compression";

import indexRouter from './routes';
import webp from './routes/webp';

const app = express();
const port = 3001;
app.use(compression());


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/webp', webp);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
