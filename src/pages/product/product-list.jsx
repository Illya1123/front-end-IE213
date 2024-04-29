import './product-list.scss';
import logo from '../../logo.svg';
import { useState } from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import { useEffect } from 'react';
import { getProductList } from '../../mockup/mockup';
import http from '../../utils/request';
const ProductList = (props) =>{
    const [searchParams] = useSearchParams();
    const cate_slug = searchParams.get('cate_slug');
    const [datas, setDatas] = useState({
        items: [],
        lastPage: 0,
        page: 1,
        limit: 12
    });
    const [overview, setOverview] = useState({
        name: 'Null',
        description: '',
        brands: [
            {
                "_id": "646a4550d84afb72dd203eab",
                "id": 1,
                "description": "Dell là thương hiệu nổi tiếng khi sở hữu nhiều sản phẩm laptop, phụ kiện, PC chất lượng cao với mức giá rất phải chăng. Các dòng laptop nổi bật và được ưa chuộng như Dell XPS, Dell Inspiron, Dell Vostro, Dell Latitude, Dell Alienware, Dell Gaming trải dài tới nhiều phân khúc khác nhau, dễ dàng lựa chọn và sử dụng",
                "icon": "backend/uploads/brand/icon/2020/8/7/dell.png",
                "name": "Dell",
                "sharedUrl": "laptop-dell",
                "slug": "dell",
                "parentId": null,
                "__v": 0
            },
            {
                "_id": "646a4550d84afb72dd203eae",
                "id": 11,
                "description": "Acer là thương hiệu công nghệ nổi tiếng của Đài Loan được nhiều người tin dùng bởi những công nghệ thông minh. Acer đã tiếp cận thị trường Việt Nam với sản phẩm máy tính cá nhân vào năm 1996. Bên cạnh sản phẩm máy tính xách tay,  Acer còn sản xuất đồng hồ thông minh, máy tính bảng, màn hình và bàn phím,...",
                "icon": "backend/uploads/brand/icon/2020/8/7/acer.png",
                "name": "Acer",
                "sharedUrl": "laptop-acer",
                "slug": "acer",
                "parentId": null,
                "__v": 0
            },
        ]
    })
    const [filter, setFilter] = useState({
        brand_ids: [],
        price_from: undefined,
        price_to: undefined
    })
    async function getProduct({cate_slug, page, limit, brands, price_from, price_to}) {
      let url = `/products?perPage=${limit}&currentPage=${page}&category=${cate_slug}`;
      if (brands !== undefined && brands !== ""){
        url += `&brands=${brands}`
      }
      if (price_from !== undefined){
        url += `&minPrice=${price_from}`
      }
      if (price_to !== undefined){
        url += `&maxPrice=${price_to}`
      }
      return await http.get(url);
    }
    useEffect(() =>{
      async function getCates() {
        return await http.get(`/categories/${cate_slug}`);
      }
      getCates().then(cate=> {
          setOverview({
            name: cate.data.name,
            description: cate.data.description,
            brands: cate.data.brands
          })
          getProduct({cate_slug, page: 1, limit: 12}).then(response =>{
            setDatas({
              items: response.data.products,
              lastPage: response.data.meta.lastPage,
              page: response.data.meta.currentPage,
              limit: 12
            })
          })
      });

    }, [cate_slug])

    useEffect(() => {
      getProduct({
        cate_slug, 
        page:  1, 
        limit: 12,
        brands: filter.brand_ids.join(','),
        price_from: filter.price_from,
        price_to: filter.price_to
      }).then(response =>{
        setDatas({
          items: response.data.products,
          lastPage: response.data.meta.lastPage,
          page: response.data.meta.currentPage,
          limit: 12
        })
      })
    },[filter])

    const clickBrand = (id) => {
        const index = filter.brand_ids.indexOf(id);
  
        if (index > -1){
            setFilter({
                ...filter,
                brand_ids: filter.brand_ids.filter(brand_id => brand_id !== id)
            })
            return;
        }else{
            setFilter({
                ...filter,
                brand_ids: [...filter.brand_ids, id]
            })
            return;
        }
    }
    
    const clickPrice = (price_from, price_to) => {
        setFilter({
          ...filter,
          price_from: price_from !== "0" ? price_from : undefined,
          price_to: price_to !== "0" ? price_to : undefined
        })
    }

    const loadMoreProduct = () => {
      getProduct({
        cate_slug, 
        page:  datas.page + 1, 
        limit: 12,
        brands: filter.brand_ids.join(','),
        price_from: filter.price_from,
        price_to: filter.price_to
      }).then((response) => {
        setDatas({
          items: [...datas.items, ...response.data.products],
          lastPage: response.data.meta.lastPage,
          page: response.data.meta.currentPage,
          limit: 12
        })
      })
    }

    return(
    <>
        <div className="container">
            <div className="card" style={{border: 'none'}}>
                <div className="card-body">
                    <h1 style={{fontSize: 24}}>{overview.name}</h1>
                    <div className="row mt-2">
                        <div className="col-6">
                            <p style={{fontSize: 14}}>{overview.description}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex">
                        {
                          overview.brands.map((brand) => (
                            <div 
                              className="p-2 rounded" 
                              key={brand.slug}
                              style={{
                                marginRight: '8px',
                                fontSize: '12px',
                                backgroundColor: 'var(--bs-primary-50)',
                                color: 'var(--bs-primary-950)'
                              }}>
                            {brand.name}
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="Brand">
                                <h3>THƯƠNG HIỆU</h3>
                                {
                                    overview.brands.map(item =>(
                                        <div className="form-check" key={item.slug}>
                                            <input className="form-check-input" type="checkbox" value="" id={`${item.name}`} onClick={()=>clickBrand(item.slug)}/>
                                            <label className="form-check-label" htmlFor={`${item.name}`}>
                                                {item.name}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="Price mt-3">
                                <h3>KHOẢNG GIÁ</h3>
                                <div className="form-group">
                      
                                    <select className='form-control form-select' onChange={e => {                                                  
                                      clickPrice(e.target.value.split(',')[0], e.target.value.split(',')[1])
                                    }}>
                                        <option value={[0,0]}>Tất cả</option>
                                        <option value={[0,2000000]} >0đ - 2.000.000đ</option>
                                        <option value={[2000000,5000000]}>2.000.000đ - 5.000.000đ</option>
                                        <option value={[5000000,10000000]}>5.000.000đ - 10.000.000đ</option>
                                        <option value={[15000000,20000000]}>15.000.000đ - 20.000.000đ</option>
                                        <option value={[20000000,30000000]}>20.000.000đ - 30.000.000đ</option>
                                        <option value={[30000000,100000000]}>30.000.000đ - 100.000.000đ</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row gx-4 gy-4">
                        {datas.items.map(item => (
                            <div className="col-3" key={item.slug}>                  
                                <Link className="card w-100 h-100 product-item" to={`/products/${item.skuId}`} key={`${item.slug}`}>
                                    <div className="card-img-top" style={{overflow: 'hidden'}}>
                                      <img src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${item.image}`} alt={item.image} />
                                    </div>
                                    <div className="card-body d-flex flex-column zindex-modal">
                                        <p style={{fontSize: '14px'}}><strong>{item.name}</strong></p>
                                        <p className='spacer'></p>
                                        <p style={{fontSize: '12px'}}>
                                          Từ
                                          <strong style={{
                                            fontSize: '14px',
                                            fontWeight: 500, 
                                            color: 'rgb(254,52,100)',
                                            marginLeft: '4px'}}>
                                            {item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                          </strong>  
                                        </p>
                                        <div style={{fontSize: '12px'}}> 
                                          Màu
                                          {item.colors.map(color => (
                                            <div style={{
                                              display: "inline-block", 
                                              width: "10px", 
                                              height: "10px", 
                                              backgroundColor: color.code, 
                                              borderRadius: '2px',
                                              marginLeft:'4px'}}
                                            key={color.name}>
                                            </div>
                                          ))}                                 
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {
                      (datas.page < datas.lastPage) ? (
                        <div className="d-flex justify-content-center mt-3">
                            <button className='btn btn-info w-50 text-white' 
                              onClick={() => loadMoreProduct()}>
                            Tải thêm
                            </button>
                        </div>
                      ) : ''
                    }
                    {
                      (datas.items.length == 0) ? (
                        <div className="d-flex justify-content-center mt-3">
                            <p><strong>Không có kết quả</strong></p>
                        </div>
                      ) : ''
                    }
                </div>
            </div>
        </div>
    </>)
}

export default ProductList;