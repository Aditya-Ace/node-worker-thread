const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

function runServices(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {workerData});
    console.log('Worker Data', workerData);
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped working with the ${code}`));
      }
    });
  });
}

runServices();
module.exports = runServices;
