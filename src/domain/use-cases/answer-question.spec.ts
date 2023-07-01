import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../reposiories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('create answer question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    questionId: '1',
    instructorId: '3'
  })

  expect(answer.content).toEqual('Nova resposta')
})