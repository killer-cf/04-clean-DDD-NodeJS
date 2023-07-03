import { Entity } from '@/core/types/entities/entity'
import { UniqueEntityId } from '@/core/types/entities/unique-entity-id'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(
      {
        ...props,
      },
      id,
    )

    return student
  }
}
