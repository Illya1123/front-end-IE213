import categories from './categories.json';
import productListLaptop from './productlist-laptop.json';
import productListBanPhim from './productlist-ban-phim.json';

export const getCategories = () =>{
    return categories
}

export const getProductList = (cate_slug) =>{
    if (cate_slug == "laptop")
        return productListLaptop;
    if (cate_slug == "ban-phim")
        return productListBanPhim;
    
    return {
        "data": {
            "_id": "646a4550d84afb72dd203f83",
            "id": 1,
            "description": "Laptop là một thiết bị máy tính có kích thước nhỏ gọn và di động. Nó được thiết kế để sử dụng trong các hoạt động làm việc, giải trí hoặc học tập khi di chuyển mà không cần phải sử dụng những chiếc máy tính để bàn cồng kềnh.",
            "icon": "media/core/categories/2021/12/29/Rectangle 1461.png",
            "name": "null",
            "sharedUrl": "laptop",
            "slug": "laptop",
            "thumbnail": "media/core/categories/2023/3/17/thumb-laptop.png",
            "__v": 0,
            "brands": []
        },
        "statusCode": 200,
        "success": true,
        "message": null
    }
}