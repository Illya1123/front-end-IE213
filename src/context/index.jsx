import CategoryProvider from "./category-context"
import {CartProvider} from "./cart/cart-context";

const MyProviders = ({children}) => {
    return (
        <CategoryProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </CategoryProvider>
    )
}

export default MyProviders;