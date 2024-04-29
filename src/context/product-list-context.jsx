import { createContext, useState } from "react";

const ProductListContext = createContext(null);
const initProductListState = {
    items: [],
    count: 0,
    page: 0
};

const CategoryProvider = ({children}) =>{
    const [categories, setCates] = useState(initCategoryState);

    const setCategories = (categories) => {
        setCates(categories);
    }

    return (
        <CategoryContext.Provider value={[categories, {setCategories}]}>
            {children}
        </CategoryContext.Provider>
    );
}

export { CategoryContext };
export default CategoryProvider;