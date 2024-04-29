import CategoryProvider from "./category-context"

const MyProviders = ({children}) =>{
    return(
        <CategoryProvider>
            {children}
        </CategoryProvider>
    )
}

export default MyProviders;