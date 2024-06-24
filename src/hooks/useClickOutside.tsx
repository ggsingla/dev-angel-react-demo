import { useEffect, useRef } from 'react'

const useClickOutside = <T extends HTMLElement>(callback: VoidFunction) => {
    const element = useRef<T>(null)

    useEffect(() => {

        const handleOutsideClick = (e: MouseEvent) => {
            if (element.current && !element.current.contains(e.target as Node)) {
                callback()
            }
            return
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }

    }, [element, callback])

    return element

}

export default useClickOutside