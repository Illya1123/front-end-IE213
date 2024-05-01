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
        setProducts([]);
    }, [name]);

    if (products.length === 0) {
        return (
            <div className="container mt-5">
                <h2>Không tìm thấy sản phẩm</h2>
                <p>Chúng tôi không tìm thấy sản phẩm có từ khóa mà bạn cung cấp. Vui lòng kiểm tra và tìm lại sản phẩm mà bạn yêu thích.</p>
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
                    <div className="col-xl-2 col-lg-3" key={item.sku_id}>
                        <Link className="card w-100 h-100 product-item" to={`/products/${item.sku_id}`}>
                            <div className="card-img-top" style={{ overflow: 'hidden' }}>
                                <img src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${item.image}`} alt={item.image} />
                            </div>
                            <div className="card-body d-flex flex-column zindex-modal">
                                <p style={{ fontSize: '14px' }}>
                                    <strong>{item.name}</strong>
                                </p>
                                <p className="spacer"></p>
                                <p style={{ fontSize: '12px' }}>
                                    Từ
                                    <strong
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: 'rgb(254,52,100)',
                                            marginLeft: '4px',
                                        }}
                                    >
                                        {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </strong>
                                </p>
                                {item.colors && (
                                    <div style={{ fontSize: '12px' }}>
                                        Màu
                                        {item.colors.map((color) => (
                                            <div
                                                style={{
                                                    display: 'inline-block',
                                                    width: '10px',
                                                    height: '10px',
                                                    backgroundColor: color.code,
                                                    borderRadius: '2px',
                                                    marginLeft: '4px',
                                                }}
                                                key={color.name}
                                            ></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFound;