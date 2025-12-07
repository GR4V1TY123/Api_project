import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export default function Category({ category, setCategory }: any) {

    const categories = ["all", "movie", "series"];

    return (
        <div className='flex justify-center'>
            <ToggleGroup
                type='single'
                size="lg"
                value={category}
                onValueChange={(v) => v && setCategory(v)}
            >
                {
                    categories.map((val) => (
                        <ToggleGroupItem
                            key={val}
                            value={val}
                            className='hover:cursor-pointer data-[state=on]:bg-blue-300'
                            size="lg"
                            variant="outline"
                        >
                            {val}
                        </ToggleGroupItem >
                    ))
                }
            </ToggleGroup>
        </div >
    )
}
