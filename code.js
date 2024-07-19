// console.log(`some code`);
// console.log(`some new code`);
// console.log(`another new code`);

const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  rl.close();
});