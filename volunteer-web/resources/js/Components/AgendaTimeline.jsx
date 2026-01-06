import { Clock } from "lucide-react";

export default function AgendaTimeline({ agendas, event }) {
    return (
        <div className="relative">
            {/* HEADER */}
            <div className="text-center mb-10">
                <h2 className="text-xl font-semibold text-gray-800">
                    Agenda Timeline Event
                </h2>
                <p className="text-sm text-gray-500">{event.name}</p>
            </div>

            {/* SCROLLABLE CONTAINER */}
            <div className="relative max-h-[420px] overflow-y-auto ml-4 px-5 py-5 agenda-scroll">
                
                {/* CENTER LINE */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2" />

                <ul className="space-y-12">
                    {agendas.map((agenda, index) => {
                        const isLeft = index % 2 === 0;
                        const isRight = index % 2 === 1;

                        return (
                            <li key={agenda.agenda_id} className="relative">
                                {/* STEP NUMBER */}
                                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-8 h-8 rounded-full bg-[#005D67] text-white flex items-center justify-center text-sm font-semibold shadow">
                                        {index + 1}
                                    </div>
                                </div>

                                <div
                                    className={`grid grid-cols-2 gap-8 items-start ${
                                        isLeft ? '' : 'text-right'
                                    }`}
                                >
                                    {/* LEFT SIDE */}
                                    <div className={`${isLeft ? 'flex justify-end -mt-6 mr-3' : 'opacity-0'}`}>
                                        {isLeft && (
                                            <div className="max-w-md bg-white p-4 rounded-xl shadow">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <Clock size={12} color="gray"/>
                                                    <p className="text-xs text-gray-500">
                                                        {agenda.agenda_start_time} – {agenda.agenda_end_time}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {agenda.agenda_description}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className={`${!isLeft ? 'flex justify-start -mt-6 ml-3' : 'opacity-0'}`}>
                                        {!isLeft && (
                                            <div className="max-w-md bg-white p-4 rounded-xl shadow text-left">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <Clock size={12} color="gray"/>
                                                    <p className="text-xs text-gray-500">
                                                        {agenda.agenda_start_time} – {agenda.agenda_end_time}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {agenda.agenda_description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* TITLE PILL */}
                                <div
                                    className={`absolute top-0 ${
                                        isRight
                                            ? 'right-1/2 mr-12'
                                            : 'left-1/2 ml-12'
                                    }`}
                                >
                                    <span className="inline-block bg-[#005D67] text-white text-sm px-4 py-1.5 rounded-full shadow">
                                        {agenda.agenda_title}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
