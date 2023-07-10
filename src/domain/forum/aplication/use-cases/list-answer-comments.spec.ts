import { ListAnswerCommentsUseCase } from './list-answer-comments'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ListAnswerCommentsUseCase

describe('List recente answers', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ListAnswerCommentsUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  test('should be able to list recent answers', async () => {
    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)

    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )
    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )
    inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: answer.id,
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: answer.id.toString(),
    })

    expect(answerComments).toHaveLength(3)
  })

  test('should be able to list paginated answer comments', async () => {
    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)

    for (let i = 1; i <= 22; i++) {
      inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: answer.id,
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: answer.id.toString(),
    })

    expect(answerComments).toHaveLength(2)
  })
})
