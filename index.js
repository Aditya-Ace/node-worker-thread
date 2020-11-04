const {Worker, isMainThread} = require('worker_threads');
const app = require('express')();

let worker;
//Let's just check if it is a main thread or the worker thread
if (isMainThread) {
  //that means the code below will be executed in the main thread

  //creating the worker
  worker = new Worker('./worker.js');

  //Just listen for the message from the worker and print it
  worker.on('message', (msg) => {
    console.log(
      `We have received your message, Hello ${msg.name}! and you are ${msg.age} years old. We take you in...`
    );
  });

  worker.on('error', (error) => {
    console.log(error);
  });

  worker.on('exit', (exit) => {
    console.log(exit);
  });
}

app.get('/', (req, res) => {
  someRandomText = JSON.stringify({name: 'Aditya', age: 28});
  worker.postMessage(someRandomText);
  res.send('Response has been sent, please check back your email after sometimes');
});

app.listen(3000, () => {
  console.log('Server has been started');
});
