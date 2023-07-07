import { CreateQuestionUseCase } from './create-question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const questionUseCase = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await questionUseCase.execute({
    content: 'Nova pergunta',
    title: 'Titulo da pergunta',
    authorId: '3',
  })

  expect(question.id).toBeTruthy()
  expect(question.content).toEqual('Nova pergunta')
  expect(question.title).toEqual('Titulo da pergunta')
})
