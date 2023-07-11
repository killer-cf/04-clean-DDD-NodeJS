import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  test('create answer question', async () => {
    const result = await sut.execute({
      content: 'Nova resposta',
      questionId: '1',
      instructorId: '3',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.content).toEqual('Nova resposta')
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
