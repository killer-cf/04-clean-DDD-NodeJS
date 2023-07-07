import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to create a question', async () => {
    const { question } = await sut.execute({
      content: 'Nova pergunta',
      title: 'Titulo da pergunta',
      authorId: '3',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Nova pergunta')
    expect(question.title).toEqual('Titulo da pergunta')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
