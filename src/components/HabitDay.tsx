import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgessBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitList } from './HabitList';
import { useState } from 'react';

interface HabitDayProps {
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date}: HabitDayProps) {

    const [completed, setCompleted] = useState(defaultCompleted)

    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayInMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('ddd')

    function handleCompletedChange(completed: number){
        setCompleted(completed)
    }

    return(
        <Popover.Root>
            <Popover.Trigger 
                className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background', {
                    'bg-violet-900':  completedPercentage >= 80,
                    'bg-violet-800':  completedPercentage >= 60 && completedPercentage < 80,
                    'bg-violet-700':  completedPercentage >= 40 && completedPercentage < 60,
                    'bg-violet-600':  completedPercentage >= 20 && completedPercentage < 40,
                    'bg-violet-500':  completedPercentage > 0 && completedPercentage < 20,
                    'bg-zinc-900':  completedPercentage === 0
                })}

            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'>
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayInMonth}</span>

                    <ProgessBar progress={completedPercentage}/>

                    <HabitList date={date} onCompletedChange={handleCompletedChange}/>

                    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
