import { ChevronFirst, MoreVertical, ChevronLast } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext<any | null>(null);
export default function Sidebar({ children }: any) {
    const [expanded, setExpanded] = useState(true);
    return (
        <aside
            className={`h-screen transition-all ${expanded ? 'w-64' : 'w-17'} `}
        >
            <nav className='h-full flex flex-col  bg-white border-r shadow-sm'>
                {/* Sidebar Header */}
                <div className='p-4 pb-2 flex justify-between items-center'>
                    <img
                        src='https://img.logoipsum.com/243.svg'
                        className={`overflow-hidden transition-all ${
                            expanded ? 'w-32' : 'w-0'
                        }`}
                        alt=''
                    />
                    <button
                        className='p-1.5 rounded-lg hover:bg-slate-300'
                        onClick={() => setExpanded((curr) => !curr)}
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    {/* Sidebar Itmes */}
                    <ul className='flex-1 px-3'>{children}</ul>
                </SidebarContext.Provider>
                {/* Sidebar Footer */}
                <div className='border-t flex p-3'>
                    <img
                        src='https://ui-avatars.com/api/?background=0D8ABC&color=fff&bold=true'
                        alt='profile'
                        className='w-10 h-10 rounded-md'
                    />
                    <div
                        className={`
                    flex justify-between items-center overflow-hidden transition-all  ${
                        expanded ? 'w-56 ml-3' : 'w-0'
                    }`}
                    >
                        <div className='leading-4'>
                            <h4 className='font-semibold'>John Doe</h4>
                            <span className='text-slate-500 text-sm'>
                                johndoe@gmail.com
                            </span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert }: any) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
    ${
        active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-slate-100 text-slate-700'
    }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? 'w-52 ml-3' : 'w-0'
                }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 bg-indigo-500 rounded-full overflow-hidden transition-all ${
                        expanded ? '' : 'top-2'
                    }`}
                ></div>
            )}
            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-sm text-indigo-800 invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible
                    group-hover:opacity-100 group-hover:translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
