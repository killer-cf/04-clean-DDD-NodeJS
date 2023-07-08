import { ListQuestionAnswersUseCase } from './list-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/types/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ListQuestionAnswersUseCase

describe('List recente questions', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  test('should be able to list recent questions', async () => {
    inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(3)
  })

  test('should be able to list paginated answers', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(2)
  })
})
