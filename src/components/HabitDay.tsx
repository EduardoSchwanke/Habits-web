import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgessBar } from './ProgressBar';

interface HabitDayProps {
    completed: number
    amount: number
}

export function HabitDay({ completed, amount}: HabitDayProps) {

    const completedPercentage = Math.round((completed / amount) * 100)

    return(
        <Popover.Root>
            <Popover.Trigger 
                className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {
                    'bg-violet-900':  completedPercentage >= 80,
                    'bg-violet-800':  completedPercentage >= 60 && completedPercentage < 80,
                    'bg-violet-700':  completedPercentage >= 40 && completedPercentage < 60,
                    'bg-violet-600':  completedPercentage >= 20 && completedPercentage < 40,
                    'bg-violet-500':  completedPercentage > 0 && completedPercentage < 20,
                    'bg-zinc-900':  completedPercentage === 0
                })}

            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>domingo</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>29/01</span>

                    <ProgessBar progress={completedPercentage}/>
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
