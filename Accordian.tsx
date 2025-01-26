import { useEffect, useState } from 'react';

export default function Accordian() {
    const [selected, setSelected] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([
        {
            id: 1,
            title: 'Data 1',
            description: `The sun dipped below the horizon, casting a warm golden glow over the tranquil meadow. `,
        },
        {
            id: 2,
            title: 'Data 2',
            description:
                'Birds chirped their evening songs, and a gentle breeze rustled through the tall grass. In the distance, a lone oak tree stood proudly, its branches stretching toward the sky like ancient arms',
        },
        {
            id: 3,
            title: 'Data 3',
            description:
                'The air was filled with the scent of wildflowers, and the world seemed to pause for a moment, as if holding its breath. I',
        },
    ]);

    // get data from api
    useEffect(() => {
        fetchData();
    },[]); //// Empty dependency array means this runs only once on mount

    const fetchData = async () => {
        try {
            const response: Response = await fetch(''); // api url
            if (!response.ok) {
                throw new Error(`http Error Status:${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelection = (id: null | number) => {
        // console.log(id);
        setSelected(selected === id ? null : id);
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p>Error:{error}</p>;
        }
    };
    return (
        <>
            {data?.length > 0 ? (
                data.map((dataItem) => (
                    <div
                        className='cursor-pointer flex flex-col border-b border-gray-300 p-4 w-100 overflow-hidden'
                        key={dataItem.id}
                        onClick={() => handleSelection(dataItem.id)}
                    >
                        <header className='flex flex-row justify-between items-center'>
                            <h1>{dataItem.title}</h1>
                            <span>{selected === dataItem.id ? '-' : '+'}</span>
                        </header>
                        {selected === dataItem.id && (
                            <p>{dataItem.description}</p>
                        )}
                    </div>
                ))
            ) : (
                <h1>No Data Found</h1>
            )}
        </>
    );
}
