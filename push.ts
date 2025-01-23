import { exec } from 'child_process';
import * as readline from 'readline';

// Function to execute shell commands
const executeCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Function to prompt for input
const promptInput = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    }),
  );
};

const main = async () => {
  let commitMessage = process.argv.slice(2).join(' ');

  if (!commitMessage) {
    commitMessage = await promptInput('Enter your commit message: ');
    if (!commitMessage.trim()) {
      console.error('❌ Commit message is required.');
      process.exit(1);
    }
  }

  const commands = [
    'git add .',
    `git commit -m "${commitMessage}"`,
    'git push',
  ];

  try {
    console.log('🚀 Running pre-push checks and committing changes...');
    for (const command of commands) {
      console.log(`Executing: ${command}`);
      const result = await executeCommand(command);
      console.log(result);
    }
    console.log('✅ Changes have been committed and pushed!');
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

main();
