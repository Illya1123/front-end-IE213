import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import http from '../../utils/request';

const ProductFound = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await http.get(`http://localhost:3000/products/search?name=${name}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [name]);

    useEffect(() => {
        setProducts([]); // Xóa các sản phẩm hiện có khi từ khóa tìm kiếm thay đổi
    }, [name]);

    if (products.length === 0) {
        return (
            <div className="container mt-5">
                <h2>Products Not Found</h2>
                <p>We couldn't find any products matching your search. Please try again or browse our categories.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row g-3 mt-2">
                <div className="col-12">
                    <p className="text-center">
                        Hiện có {products.length} sản phẩm có tên trùng với từ khóa "{name}"
                    </p>
                </div>
                {products.map((item) => (
                    <div className="col-xl-2 col-lg-3" key={item.slug}>
                        <Link className="card w-100 h-100 product-item" to={`/products/${item.skuId}`} key={`${item.slug}`}>
                            <div className="card-img-top" style={{ overflow: 'hidden' }}>
                                <img src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${item.image}`} alt={item.image} />
                            </div>
                            <div className="card-body d-flex flex-column zindex-modal">
                                <p style={{ fontSize: '14px' }}><strong>{item.name}</strong></p>
                                <p className='spacer'></p>
                                <p style={{ fontSize: '12px' }}>
                                    Từ
                                    <strong style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: 'rgb(254,52,100)',
                                        marginLeft: '4px'
                                    }}>
                                        {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </strong>
                                </p>
                                <div style={{ fontSize: '12px' }}>
                                    Màu
                                    {item.colors.map((color) => (
                                        <div
                                            style={{
                                                display: "inline-block",
                                                width: "10px",
                                                height: "10px",
                                                backgroundColor: color.code,
                                                borderRadius: '2px',
                                                marginLeft: '4px'
                                            }}
                                            key={color.name}>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductFound;