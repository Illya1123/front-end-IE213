import { createContext, useState } from "react";

const CategoryContext = createContext(null);
const initCategoryState = [
    {
        id: "1",
        description: "des",
        name: "Laptop",
        slug: "laptop"
    },
    {
        id: "2",
        description: "des2",
        name: "Balo",
        slug: "balo"
    },
];

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