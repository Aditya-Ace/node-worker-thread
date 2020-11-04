const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const ora = require('ora');
const heavyTask = require('./heavyTask');

if (!isMainThread) {
  const spinner = ora('Loading undead unicorns').start();

  // Update
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Killing all the undead unicorns';
  }, 1000);

  //Listen to the message from parent
  // parentPort.on('message', (data) => {
  //   const parsedData = JSON.parse(data);
  //   parentPort.postMessage(parsedData);
  // });
  let result = heavyTask(workerData);
  // send  the meg to the parent port
  parentPort.postMessage({result});
  // //exit the program
  // process.exit(0);
  // spinner.stop();
}
