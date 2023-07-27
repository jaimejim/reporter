# Text Summarization with OpenAI

This Node.js script reads a text file, splits it into chunks, and generates a summary for each chunk using OpenAI's GPT-4 model. The summaries are then written to an output file.

## Prerequisites

- Node.js
- An OpenAI API key

## Installation

1. Clone the repository and navigate to its directory.
2. Run `npm install` to install the necessary packages.
3. Create a `.env` file in the root directory and set your OpenAI API key as `OPENAI_API_KEY`. If you do not do that you will get `Error generating summary: Error: Request failed with status code 401`.

## Usage

Run the script with the following command:

```bash
node reporter.js input.md output.md
```

Where input.md is the text file you want to summarize, and output.md is the file where the summaries will be written.

The script will print out the number of chunks and the progress of the summarization. Once finished, it will write the summaries to the output file.

```
node reporter.js input.md output.md
[15:35:04] Number of chunks: 1
[15:35:04] Processing chunk 1 of 1
[15:35:04] Sending request to OpenAI...
[15:36:07] Received response from OpenAI
[15:36:07] Summary written to output.md
```

You can find the sample `input.md` and `output.md` in this repository too.