import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, XCircle } from 'lucide-react'
import React from 'react'

type Props = {
    correctAnswers: number,
    incorrectAnswers: number
}

const MCQCounter = ({correctAnswers , incorrectAnswers}: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
      <CheckCircle2 color="green" size={30} />
      <span className="mx-3 text-2xl text-[green]">{correctAnswers}</span>

      <Separator orientation="vertical" />

      <span className="mx-3 text-2xl text-[red]">{incorrectAnswers}</span>
      <XCircle color="red" size={30} />
    </Card>
  );
}

export default MCQCounter