import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitListProps {
    date: Date,
    onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        create_at: string
    }>,
    CompletedHabits: string[]
}

export function HabitList({ date, onCompletedChange }: HabitListProps) {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString()
            }
        }).then(Response => {
            setHabitsInfo(Response.data)
        })
    }, [])

    async function handleToggleHAbit(habitId: string){
        const isHabitAlreadyCompleted = habitsInfo!.CompletedHabits.includes(habitId)

        await api.patch(`habits/${habitId}/toggle`)

        let completedHabits: string[] = []

        if(isHabitAlreadyCompleted){
            completedHabits = habitsInfo!.CompletedHabits.filter(id => id !== habitId)
        }else{
            completedHabits = [...habitsInfo!.CompletedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            CompletedHabits: completedHabits
        })

        onCompletedChange(completedHabits.length)
    }

    const isDateInPast= dayjs(date).endOf('day').isBefore(new Date())

    return (
        <div className='mt-6 flex flex-col gap-3'>
            {
                habitsInfo?.possibleHabits.map((habit) => {
                    return (
                        <Checkbox.Root
                            key={habit.id}
                            onCheckedChange={() => handleToggleHAbit(habit.id)}
                            defaultChecked={habitsInfo.CompletedHabits.includes(habit.id)}
                            disabled={isDateInPast} 
                            className='flex items-center gap-3 group focus:outline-none'
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white"/>
                                </Checkbox.Indicator>
                            </div>
                            <span 
                                className='font-semibold text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
                            >
                                {habit.title}
                            </span>
                        </Checkbox.Root>
                    )
                })
            }
            
        </div>
    )
} 