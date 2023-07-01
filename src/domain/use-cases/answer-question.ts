import { Answer } from "../entities/answer"
import { AnswersRepository } from "../reposiories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository){}

  async execute({ content, instructorId, questionId}: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId
    })

    await this.answersRepository.create(answer)

    return answer
  }
}