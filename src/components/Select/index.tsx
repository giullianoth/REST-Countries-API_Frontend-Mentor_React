import { useState, useRef, useEffect, useMemo } from "react"
import styles from "./Select.module.css"
import { FaAngleDown } from "react-icons/fa"
import AnimateHeight from "react-animate-height"

interface Option {
    value: string
    label: string
}

interface Props {
    options: Option[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const Select = ({ options, value, onChange, placeholder = "Filter by Region" }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLLabelElement | null>(null)

    const selectedOption = useMemo(
        () => options.find(opt => opt.value === value) || { label: placeholder, value: "" },
        [options, value, placeholder]
    )

    const closeDropdown = () => setIsOpen(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                closeDropdown()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue)
        closeDropdown()
    }

    const allOptions = [
        { value: "", label: placeholder },
        ...options
    ]

    return (
        <label
            className={styles.select}
            ref={selectRef}
            onClick={() => setIsOpen(prev => !prev)}>
            <div
                className={styles.select__header}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}>
                {selectedOption.label}
            </div>

            <FaAngleDown className={styles.select__icon + (isOpen ? ` ${styles.select__iconOpen}` : "")} />

            <AnimateHeight
                duration={300}
                height={isOpen ? "auto" : 0}
                className={styles.select__dropdown}>
                <ul className={styles.select__list} role="listbox">
                    {allOptions.map(option => (
                        <li
                            key={option.value}
                            className={styles.select__option + (option.value === value ? ` ${styles.selected}` : "")}
                            role="option"
                            aria-selected={option.value === value}
                            onClick={event => {
                                event.stopPropagation()
                                handleOptionClick(option.value)
                            }}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            </AnimateHeight>
        </label>
    );
};

export default Select;