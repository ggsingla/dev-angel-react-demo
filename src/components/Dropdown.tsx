import { IconChevronDown } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

export interface IItem {
    value: string
    title: string
}

interface DropDownProps {
    items: IItem[],
    onSelect: (item: IItem) => void
}

const Dropdown = ({
    items,
    onSelect
}: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<IItem>()

    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }
    const closeDropdown = () => {
        setIsOpen(false)
    }

    const onUpdateSelected = (item: IItem) => {
        onSelect(item)
        setSelectedValue(item)
        closeDropdown()
    }
    const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown)

    return (
        <div
            ref={dropdownRef}
            className='w-full max-w-64 relative isolate'>
            {/* trigger */}
            {/* 4 grid px-4 = padding in the x direction with 4*4px = 16 px */}
            <button
                className='px-4 py-2 rounded-lg ring-1 ring-slate-400 flex justify-between items-center w-full'
                onClick={toggleDropdown}
            >
                <p className='w-full truncate'>
                    {selectedValue?.title || ''}
                </p>
                <IconChevronDown size={16} className='text-slate-400' />
            </button>
            {/* content */}
            <div

                className={clsx(
                    'z-10 shadow-xl rounded-lg ring-1 ring-slate-200 absolute top-12 w-full transition-all max-h-[300px] overflow-y-auto',
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-5'
                )}
            >
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onUpdateSelected(item)
                            }}
                            className='px-4 py-2 hover:bg-slate-100'>
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown
