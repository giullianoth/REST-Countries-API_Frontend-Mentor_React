export const useChangeTheme = () => {
    
    const changeTheme = (theme: "dark" | "light") => {
        const rootElement = document.documentElement

        switch (theme) {
            case "dark":
                rootElement.style.setProperty("--color-background", "var(--color-blue-950)")
                rootElement.style.setProperty("--color-background-elements", "var(--color-blue-900)")
                rootElement.style.setProperty("--color-text", "var(--color-white)")
                break

            case "light":
                rootElement.style.setProperty("--color-background", "var(--color-grey-50)")
                rootElement.style.setProperty("--color-background-elements", "var(--color-white)")
                rootElement.style.setProperty("--color-text", "var(--color-grey-950)")
                break
        }
    }

    return changeTheme
}