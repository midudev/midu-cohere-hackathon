import cohere from "cohere-ai";
import ora from 'ora'

const spinner = ora('Generating 5 frontend interview questions').start();

cohere.init('mJ9GVG9lcV8iO7TJYOuQjqfcw4JB2y1CmirFXdX1');

const start = performance.now()

const intervalId = setInterval(() => {
  const time = Math.floor((performance.now() - start) / 1000)
  spinner.text = `Generating 5 frontend interview questions (${time}s)...`
})

const response = await cohere.generate({
  model: 'command-xlarge-20221108',
  prompt: `Generate a list of 5 interview questions for a senior frontend engineer.`,
  max_tokens: 500,
  temperature: 1.2, // grado de aleatoriedad de las respuestas
  k: 0,
  p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop_sequences: [],
  return_likelihoods: 'NONE'
})

const time = Math.floor((performance.now() - start) / 1000)
spinner.succeed(`Done (${time}s!)`)
clearInterval(intervalId)

const { generations } = response.body;

console.log(generations[0].text)