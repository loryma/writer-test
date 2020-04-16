const fs = require("fs");
const readline = require("readline");

const confirm = (question) =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\n${question}`, (answer) => {
      if (answer === "y") return resolve();

      reject();
    });
  });

class Writer {
  constructor(file) {
    this.file = file;
  }

  write(data) {
    confirm("Are you sure?")
      .then(() => fs.appendFileSync(this.file, data))
      .catch(() => {
        /* do nothing */
      });
  }
}

module.exports = Writer;
