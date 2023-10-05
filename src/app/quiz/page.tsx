import React from 'react'
import QuizCreation from './components/QuizCreation'

type Props = {}

const metadata = {
    title: "Quiz / AI Quiz App",
    description: "Quiz",
}

const Quiz = (props: Props) => {
  return (
    <QuizCreation />
  )
}

export default Quiz