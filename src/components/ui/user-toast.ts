type ToastProps = {
    title?: string
    description?: string
    variant?: "default" | "destructive"
}

export const toast = ({ title, description, variant = "default"}: ToastProps) => {
    const message = `${title ? title + ": " : ""}${description || ""}`

    if (variant === "destructive"){
        console.error(message)
        alert(`Error: ${message}`)
    }else {
        console.log(message)
        alert({message: "The file got successfully"})
    }
}
export const useToast =() => {
    return { toast }
}