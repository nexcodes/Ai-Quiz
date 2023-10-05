import CustomWordCount from '@/components/CustomWordCount'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import React from 'react'

type Props = {}

const HotTopicCard = (props: Props) => {
  return (
    <Card className='col-span-4'>
        <CardHeader className='text-2xl font-bold'>Hot Topic</CardHeader>
        <CardDescription>
            Click on a topic to start a quiz on it!
        </CardDescription>

        <CardContent className='pl-2'>
            <CustomWordCount />
        </CardContent>

    </Card>
  )
}

export default HotTopicCard