import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill =minimumSummaryDatesSize - summaryDates.length

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">D</div>
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">S</div>
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">T</div>
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">Q</div>
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">Q</div>
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">S</div>
                <div className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">S</div>
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summaryDates.map((day, index) => {
                        const progress = Math.floor(Math.random() * 11)

                        return (
                            <HabitDay key={day.toString()} amount={10} completed={progress}/>
                        )
                    })
                }
                {
                    amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                        return (
                            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
                        )
                    })
                }
            </div>
        </div>
    )
}