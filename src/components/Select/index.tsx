import type { ComponentProps, ReactNode } from "react"
import styles from "./Select.module.css"
import { FaAngleDown } from "react-icons/fa"

interface Props extends ComponentProps<"select"> {
    children?: ReactNode
}

const Select = ({ children, ...selectProps }: Props) => {
    return (
        <label className={styles.select}>
            <select {...selectProps}>
                {children}
            </select>

            <FaAngleDown />
        </label>
    )
}

export default Select