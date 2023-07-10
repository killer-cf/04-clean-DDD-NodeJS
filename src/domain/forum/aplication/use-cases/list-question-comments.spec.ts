import { ListQuestionCommentsUseCase } from './list-question-comments'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ListQuestionCommentsUseCase

describe('List recente questions', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ListQuestionCommentsUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  test('should be able to list recent questions', async () => {
    const question = makeQuestion()

    inMemoryQuestionsRepository.create(question)

    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )
    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )
    inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: question.id,
      }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: question.id.toString(),
    })

    expect(questionComments).toHaveLength(3)
  })

  test('should be able to list paginated question comments', async () => {
    const question = makeQuestion()

    inMemoryQuestionsRepository.create(question)

    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: question.id,
        }),
      )
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: question.id.toString(),
    })

    expect(questionComments).toHaveLength(2)
  })
})