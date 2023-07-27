// Import necessary packages
const fs = require('fs');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const chalk = require('chalk');
const moment = require('moment');

// Load environment variables
dotenv.config();

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Get file names from command line arguments
const [inputFile, outputFile] = process.argv.slice(2);

// Read the input file
fs.readFile(inputFile, 'utf8', async (err, data) => {
  if (err) {
    console.error(chalk.red(`[${moment().format('HH:mm:ss')}] Error reading file ${inputFile}:`, err));
    return;
  }

  // Split the text into chunks of approximately 8192 words
  let chunks = data.split(/\s+/).reduce((acc, word, i) => {
    if (i % 8192 === 0) acc.push('');
    acc[acc.length - 1] += ' ' + word;
    return acc;
  }, []);

  // If chunks is null (i.e., the file is smaller than 8192 words), create a new array with data as its only element
  if (!chunks) {
    chunks = [data];
  }

  // Print the number of chunks
  console.log(chalk.blue(`[${moment().format('HH:mm:ss')}] Number of chunks: ${chunks.length}`));

  let summary = '';
  for (let i = 0; i < chunks.length; i++) {
    console.log(chalk.blue(`[${moment().format('HH:mm:ss')}] Processing chunk ${i + 1} of ${chunks.length}`));  // Print the current chunk number

    try {
      // Generate summary with OpenAI
      console.log(chalk.yellow(`[${moment().format('HH:mm:ss')}] Sending request to OpenAI...`));
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{role: "user", content: "Summarize the following text in markdown. Structure the text on a per-draft basis, based on the agenda. Summarize the discussions and focus on decisions, insights and next-steps from the meeting. Also add links embedded in the text: " + chunks[i]}],
      });
      console.log(chalk.yellow(`[${moment().format('HH:mm:ss')}] Received response from OpenAI`));

      summary += chatCompletion.data.choices[0].message.content + '\n\n';
    } catch(err) {
      console.error(chalk.red(`[${moment().format('HH:mm:ss')}] Error generating summary:`, err));
    }
  }

  // Write the summary to the output file
  fs.writeFile(outputFile, summary, 'utf8', err => {
    if (err) {
      console.error(chalk.red(`[${moment().format('HH:mm:ss')}] Error writing file ${outputFile}:`, err));
      return;
    }

    console.log(chalk.green(`[${moment().format('HH:mm:ss')}] Summary written to ${outputFile}`));
  });
});