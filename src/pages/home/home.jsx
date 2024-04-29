import './styles.scss';

import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CategoryContext } from '../../context/category-context';

const Home = () =>{
    const [categories] = useContext(CategoryContext);
    const items = [
        {
            "_id": "64761c319760f84012d87fa7",
            "skuId": 1431,
            "productId": 590,
            "categoryId": 1,
            "sharedUrl": "laptop/apple-macbook-pro-13-chinh-hang-apple-m1-late-2020-1431",
            "slug": "apple-macbook-pro-13-chinh-hang-apple-m1-late-2020-myd82saa",
            "image": "backend/uploads/product/avatar/2020/11/19/macbookpro132020_00.jpg",
            "name": "Apple Macbook Pro 13 (Chính hãng - Apple M1 - Late 2020)",
            "colors": [
              {
                "name": "Space Gray",
                "code": "#5c5c5c"
              }
            ],
            "price": 33990000,
            "modelValues": [
              "M1\n8GB, 256GB",
              "Space Gray",
              "Mới, Sealed, Chính hãng"
            ],
            "brand": {
              "id": 6,
              "description": "Thương hiệu Apple là một trong những đế chế hùng mạnh của thế giới công nghệ. Tất cả các sản phẩm của Apple luôn nằm trong top danh sách những sản phẩm đáng mua nhất, từ laptop, PC, máy tính bảng cho đến smartphone, tất cả chúng đều có chung một điều đáng tự hào đó là mẫu mã cực kỳ đẹp.",
              "icon": "backend/uploads/brand/icon/2020/8/7/apple.png",
              "name": "Apple",
              "sharedUrl": "laptop-apple",
              "slug": "apple",
              "parentId": null
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d87f7f",
            "skuId": 6283,
            "productId": 470,
            "categoryId": 1,
            "sharedUrl": "laptop/dell-xps-13-9310-6283",
            "slug": "dell-xps-13-9310-xps931008nu",
            "image": "media/core/products/2023/3/22/dell-xps-9310-thinkpro-01.png",
            "name": "Dell XPS 13 9310",
            "colors": [
                {
                    "name": "Platium Silver",
                    "code": "#ECECEC"
                }
            ],
            "price": 18990000,
            "modelValues": [
                "i5 1135G7, 4K+ Touch\n8GB, 512GB",
                "Platium Silver",
                "Used, Nhập khẩu"
            ],
            "brand": {
                "id": 412,
                "description": "Dell XPS 13 là phiên bản nhỏ gọn và mỏng nhẹ nhất trong dòng Dell XPS. Sản phẩm đánh tan những định kiến trước đây về laptop Dell cồng kềnh và đơn điệu khi mọi chi tiết từ thiết kế, chất lượng hoàn thiện bên ngoài cho tới hiệu năng cấu hình bên trong đều toát lên được sự chỉn chu và đẳng cấp",
                "icon": "media/core/brands/2023/3/30/logo-dell-thinkpro-10.png",
                "name": "XPS 13",
                "sharedUrl": "laptop-dell-xps-13",
                "slug": "laptop-dell-xps-13",
                "parentId": 310
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d87f80",
            "skuId": 627,
            "productId": 179,
            "categoryId": 1,
            "sharedUrl": "laptop/dell-xps-13-9380-627",
            "slug": "dell-xps-13-9380-xps938001nu",
            "image": "media/core/products/2022/12/16/dell-xps-13-9380-thinkpro-01.png",
            "name": "Dell XPS 13 9380",
            "colors": [
                {
                    "name": "Plantium Silver",
                    "code": "#c0c0c0"
                }
            ],
            "price": 14990000,
            "modelValues": [
                "i5 8265U, FHD\n8GB, 256GB",
                "Plantium Silver",
                "Used, Nhập khẩu"
            ],
            "brand": {
                "id": 412,
                "description": "Dell XPS 13 là phiên bản nhỏ gọn và mỏng nhẹ nhất trong dòng Dell XPS. Sản phẩm đánh tan những định kiến trước đây về laptop Dell cồng kềnh và đơn điệu khi mọi chi tiết từ thiết kế, chất lượng hoàn thiện bên ngoài cho tới hiệu năng cấu hình bên trong đều toát lên được sự chỉn chu và đẳng cấp",
                "icon": "media/core/brands/2023/3/30/logo-dell-thinkpro-10.png",
                "name": "XPS 13",
                "sharedUrl": "laptop-dell-xps-13",
                "slug": "laptop-dell-xps-13",
                "parentId": 310
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d87f81",
            "skuId": 6524,
            "productId": 187,
            "categoryId": 1,
            "sharedUrl": "laptop/dell-precision-5550-6524",
            "slug": "dell-precision-5550-precision555012nu",
            "image": "media/core/products/2022/10/4/dell-precision-5550-thinkpro-11.jpg",
            "name": "Dell Precision 5550",
            "colors": [
                {
                    "name": "Shadow Grey",
                    "code": "#8D8D8D"
                }
            ],
            "price": 27990000,
            "modelValues": [
                "i7 10850H, Quadro T2000, FHD+\n16GB, 1TB",
                "Shadow Grey",
                "Used, Nhập khẩu"
            ],
            "brand": {
                "id": 311,
                "description": "Dell Precision là dòng laptop Workstation được thiết kế tối ưu đáp ứng nhu cầu chạy những ứng dụng chuyên biệt như thiết kế kiến trúc, đồ họa, dựng hình hay render/edit video. Hiệu năng của dòng Precision nổi trội nhờ cấu hình mạnh, chip xử lý cao cấp và dung lượng bộ nhớ cực khủng",
                "icon": "backend/uploads/brand/icon/2020/8/7/dell.png",
                "name": "Precision",
                "sharedUrl": "laptop-dell-precision",
                "slug": "laptop-dell-precision",
                "parentId": 1
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d87f96",
            "skuId": 6074,
            "productId": 937,
            "categoryId": 1,
            "sharedUrl": "laptop/asus-tuf-dash-f15-chinh-hang-6074",
            "slug": "asus-tuf-dash-f15-chinh-hang-fx516pm-hn002w-01",
            "image": "media/core/products/2022/9/27/asus-tuf-dash-f15-thinkpro-1.png",
            "name": "ASUS TUF Dash F15 (Chính hãng)",
            "colors": [
                {
                    "name": "Eclipse Gray",
                    "code": "#6b6b6b"
                }
            ],
            "price": 21190000,
            "modelValues": [
                "i7 11370H, RTX 3060\n 8GB, 512GB\n 144Hz",
                "Eclipse Gray",
                "Outlet, Chính hãng"
            ],
            "brand": {
                "id": 206,
                "description": "ASUS TUF Gaming - Dòng laptop gaming giá rẻ, tầm trung với cấu hình và tính năng ở mức đủ dùng, hướng tới người dùng thích chơi game nhưng chưa có quá nhiều ngân sách",
                "icon": "backend/uploads/brand/icon/2020/8/7/asus.png",
                "name": "TUF Gaming",
                "sharedUrl": "laptop-asus-tuf-gaming",
                "slug": "laptop-asus-tuf-gaming",
                "parentId": 8
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d87f75",
            "skuId": 4328,
            "productId": 1702,
            "categoryId": 1,
            "sharedUrl": "laptop/lenovo-thinkpad-e14-gen-4-intel-4328",
            "slug": "thinkpad-e14-gen-4-intel-thinkpade14g4i01ns",
            "image": "media/core/products/2023/3/22/lenovo-thinkpad-e14-gen-4-thinkpro-0001.png",
            "name": "Lenovo ThinkPad E14 Gen 4 (Intel)",
            "colors": [
                {
                    "name": "Đen",
                    "code": "#000000"
                }
            ],
            "price": 21990000,
            "modelValues": [
                "i5 1240P, FHD\n8GB, 512GB",
                "Đen",
                "Mới, Sealed, Nhập khẩu"
            ],
            "brand": {
                "id": 170,
                "description": "ThinkPad là thương hiệu Laptop Business tới từ Lenovo. Thinkpad nổi tiếng với chất liệu cao cấp, hiệu năng ổn định và bàn phím được đánh giá tốt nhất ngành công nghiệp laptop.",
                "icon": "media/core/brands/2023/3/17/logo-lenovo-thinkpro-01.png",
                "name": "ThinkPad",
                "sharedUrl": "laptop-lenovo-thinkpad",
                "slug": "laptop-lenovo-thinkpad",
                "parentId": 4
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d88005",
            "skuId": 3739,
            "productId": 1462,
            "categoryId": 7,
            "sharedUrl": "ban-phim/ban-phim-co-iqunix-f96-coral-sea-3739",
            "slug": "ban-phim-co-iqunix-f96-coral-sea-cherry-mx-red",
            "image": "media/core/products/2022/2/24/F96-01.png",
            "name": "Bàn phím cơ IQUNIX F96 Coral Sea",
            "colors": [
                {
                    "name": "Blue Grey",
                    "code": "#607b8b"
                }
            ],
            "price": 4590000,
            "modelValues": [
                "Led RGB - Cherry MX Red Switch",
                "Blue Grey",
                "Mới, Full box, Chính hãng"
            ],
            "brand": {
                "id": 92,
                "description": "IQUNIX là thương hiệu khá trẻ ở thị trường Việt Nam khi chỉ mới xuất hiện từ năm 2014. Sản phẩm chủ lực chủ lực của IQUNIX là bàn phím cơ và tập trung vào phân khúc tầm cao từ 3 triệu trở lên. Phím cơ IQUNIX có thiết kế độc đáo, định hình phong cách cho người dùng.",
                "icon": "media/core/brands/2023/3/31/logo-IQUNIX-thinkpro-01.png",
                "name": "IQUNIX",
                "sharedUrl": "ban-phim-iqunix",
                "slug": "iqunix",
                "parentId": null
            },
            "__v": 0
        }, 
        {
            "_id": "64761c319760f84012d880cd",
            "skuId": 1030,
            "productId": 415,
            "categoryId": 8,
            "sharedUrl": "chuot/chuot-logitech-g304-lightspeed-wireless-1030",
            "slug": "chuot-logitech-g304-lightspeed-wireless-black",
            "image": "backend/uploads/product/avatar/2020/9/15/g304-00jpg",
            "name": "Chuột Logitech G304  LIGHTSPEED Wireless",
            "colors": [
                {
                    "name": "Mystic Black",
                    "code": "#454444"
                }
            ],
            "price": 820000,
            "modelValues": [
                "",
                "Mystic Black",
                "Mới, Full box, Chính hãng"
            ],
            "brand": {
                "id": 14,
                "description": "Logitech là thương hiệu nổi tiếng của Thụy Sĩ. Chuột và bàn phím máy tính là hai sản phẩm tạo nên \"chỗ đứng'' vững vàng trong ngành phụ kiện máy tính của Logitech. Những điểm đặc biệt của bàn phím Logitech là khả năng kháng nước, thiết kế tối giản, tổ hợp phím đa chức năng.",
                "icon": "media/core/brands/2023/3/17/logo-logitech-thinkpro-01.png",
                "name": "Logitech",
                "sharedUrl": "ban-phim-logitech",
                "slug": "logitech",
                "parentId": null
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d880c3",
            "skuId": 5528,
            "productId": 2187,
            "categoryId": 28,
            "sharedUrl": "arm-man-hinh/gia-do-man-hinh-human-motion-t9-pro-5528",
            "slug": "gia-do-man-hinh-human-motion-t9-pro-humanmotiont9pro01cf",
            "image": "media/core/products/2022/11/11/gia-do-man-hinh-human-motion-t9-pro-thinkpro-4.png",
            "name": "Arm màn hình Human Motion T9 Pro",
            "colors": [
                {
                    "name": "Xám",
                    "code": "#bebebe"
                },
                {
                    "name": "Trắng",
                    "code": "#ffffff"
                }
            ],
            "price": 1790000,
            "modelValues": [
                "",
                "Xám",
                "Mới, Full box, Chính hãng"
            ],
            "brand": {
                "id": 95,
                "description": "HumanMotion là thương hiệu arm màn hình mới nổi trong một năm trở lại đây tại thị trường Việt Nam. Arm màn hình Human Motion tạo được sức hút lớn và trở thành một trong những lựa chọn hàng đầu của anh em đam mê công nghệ và setup.",
                "icon": "media/core/brands/2022/3/9/Logo-HumanMotion-xanh.png",
                "name": "Humanmotion",
                "sharedUrl": "arm-man-hinh-humanmotion",
                "slug": "humanmotion",
                "parentId": null
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d88048",
            "skuId": 5931,
            "productId": 2352,
            "categoryId": 27,
            "sharedUrl": "am-thanh/loa-devialet-mania-5931",
            "slug": "loa-devialet-mania-opera-de-paris-devialetmodp01nf",
            "image": "media/core/products/2022/12/21/devialet-mania-blk-01-500x500.jpeg",
            "name": "Loa Devialet Mania",
            "colors": [
                {
                    "name": "Deep Black",
                    "code": "#000000"
                },
                {
                    "name": "Rose Gold",
                    "code": "#ffec8b"
                },
                {
                    "name": "Light Grey",
                    "code": "#888888"
                }
            ],
            "price": 22990000,
            "modelValues": [
                "",
                "Deep Black",
                "Mới, Full box, Nhập khẩu"
            ],
            "brand": {
                "id": 160,
                "description": "Devialet là thương hiệu thiết bị âm thanh được biết đến với các đặc điểm là sự độc đáo và nổi bật hoàn toàn. Đặc biệt các mẫu loa bluetooth đình đám cuốn hút ngay từ lần đầu tiên, chất âm bùng nổ, vượt trội hơn hẳn.",
                "icon": "media/core/brands/2022/12/21/kisspng-devialet-phantom-loudspeaker-android-devialet-5b1aa30e7d1ab7.9448852415284723345124.jpg",
                "name": "Devialet",
                "sharedUrl": "am-thanh-devialet",
                "slug": "devialet",
                "parentId": null
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d88067",
            "skuId": 4411,
            "productId": 1729,
            "categoryId": 21,
            "sharedUrl": "ghe-cong-thai-hoc/vchair-commander-4411",
            "slug": "ghe-cong-thai-hoc-vchair-commander-gray",
            "image": "media/core/products/2022/10/22/Vchair-Commander-Gray-08.png",
            "name": "Ghế công thái học Vchair Commander",
            "colors": [
                {
                    "name": "Gray",
                    "code": "#bebebe"
                },
                {
                    "name": "Black",
                    "code": "#000000"
                }
            ],
            "price": 7590000,
            "modelValues": [
                "",
                "Gray",
                "Mới, Full box, Chính hãng"
            ],
            "brand": {
                "id": 136,
                "description": "Vchair là thương hiệu chuyên về ghế Công Thái Học của công ty TNHH Thương mại và Công nghệ SPEEDCOM. Vchair Evolution được hiểu là sự kết hợp giữa SPEEDCOM và nhà máy sản xuất ghế cho thương hiệu Ergomax làm thị trường tại Việt Nam. Về cơ bản thì không khác gì các sản phẩm của Ergomax.",
                "icon": "media/core/brands/2022/7/22/Nhãn_Logo-02-01.png",
                "name": "VChair",
                "sharedUrl": "ghe-cong-thai-hoc-vchair",
                "slug": "vchair",
                "parentId": null
            },
            "__v": 0
        },
        {
            "_id": "64761c319760f84012d88068",
            "skuId": 4409,
            "productId": 1728,
            "categoryId": 21,
            "sharedUrl": "ghe-cong-thai-hoc/vchair-evolution-4409",
            "slug": "ghe-cong-thai-hoc-vchair-evolution-gray",
            "image": "media/core/products/2022/10/22/Vchair-Evolution-Gray-01.png",
            "name": "Ghế công thái học Vchair Evolution",
            "colors": [
                {
                    "name": "Mineral Gray",
                    "code": "#8C8C8C"
                },
                {
                    "name": "Black",
                    "code": "#000000"
                }
            ],
            "price": 12990000,
            "modelValues": [
                "",
                "Mineral Gray",
                "Mới, Full box, Chính hãng"
            ],
            "brand": {
                "id": 136,
                "description": "Vchair là thương hiệu chuyên về ghế Công Thái Học của công ty TNHH Thương mại và Công nghệ SPEEDCOM. Vchair Evolution được hiểu là sự kết hợp giữa SPEEDCOM và nhà máy sản xuất ghế cho thương hiệu Ergomax làm thị trường tại Việt Nam. Về cơ bản thì không khác gì các sản phẩm của Ergomax.",
                "icon": "media/core/brands/2022/7/22/Nhãn_Logo-02-01.png",
                "name": "VChair",
                "sharedUrl": "ghe-cong-thai-hoc-vchair",
                "slug": "vchair",
                "parentId": null
            },
            "__v": 0
        }
    ]
    return(
    <div className="wrapper">
        <section className="section-banner container">
            <div className="row">
                <div className="col-4 para">
                    <h1 style={{color: "white"}}>Giao diện mới, phục vụ bạn và người thân tốt hơn 💚💚💚</h1>
                    <p style={{color: 'white'}}>Sau 6 tháng cải tiến, ThinkPro chính thức ra mắt phiên bản Website mới. Đội ngũ ThinkPro luôn tự hào với sứ mệnh trở thành thương hiệu bán lẻ Laptop và đồ công nghệ tốt cho bạn và người thân!</p>
                </div>
                <div className="col-8 img">
                    <img src="./section-banner.webp" alt="section-banner" style={{width: "100%", height: "100%"}}/>
                </div>
            </div>
        </section>
        <section className="section-category container mt-5">
            <h2>Danh mục</h2>
            <div className="card mt-3" style={{border: "none"}}>
                <div className="card-body" style={{height: '200px'}}>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        type:""
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {categories.map(cate => (
                        <SwiperSlide key={cate.slug}>
                            <Link to={`/products?cate_slug=${cate.slug}`}>
                                <div className="cat-item" style={{margin: 'auto'}}>
                                    <img src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${cate.icon}`} alt="section-banner" />
                                    <p>{cate.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                </div>
            </div>
        </section>
        <section className="section-recomend container mt-5">
            <h2>Gợi ý cho bạn</h2>
            <div className="row g-3 mt-2">
                {
                    items.map(item => (
                        <div className="col-xl-2 col-lg-3" key={item.slug}>                  
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
                    ))
                }
            </div>
        </section>
        <section className='section-info container mt-5'>
            <div className="card" style={{border: 'none'}}>
                <div className="card-body">
                    <h2> <span>ThinkPro</span> <span style={{fontSize:'0.8em', color: 'rgba(107 ,112 ,117, 1)'}}>Là nơi để bạn và người thân tin tưởng lựa chọn</span></h2>
                    <div className="row mt-3 p-3">
                        <div className="col-3" style={{backgroundColor: 'rgb(245,253,255)'}}>
                            <i className='bi bi-info-circle-fill' style={{color: '#00D4FF', fontSize:'1.3em'}}></i>
                            <p className='mt-3' style={{fontWeight: '600'}}>Được trải nghiệm thực tế sản phẩm, lựa chọn đúng hơn.</p>
                            <p className='mt-2'>Không còn bọc nilon, hạn chế quyền được trải nghiệm trước mua hàng của người dùng.</p>
                        </div>
                        <div className="col-3" style={{backgroundColor: 'rgb(245,253,255)'}}>
                            <i className='bi bi-info-circle-fill' style={{color: '#00D4FF', fontSize:'1.3em'}}></i>
                            <p className='mt-3' style={{fontWeight: '600'}}>Bạn lo lắng khi không biết sản phẩm nào phù hợp? ThinkPro có đội ngũ tư vấn tận tâm và có chuyên môn.</p>
                            <p className='mt-2'>Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư vấn tại ThinkPro.</p>
                        </div>
                        <div className="col-3" style={{backgroundColor: 'rgb(245,253,255)'}}>
                            <i className='bi bi-info-circle-fill' style={{color: '#00D4FF', fontSize:'1.3em'}}></i>
                            <p className='mt-3' style={{fontWeight: '600'}}>Bạn gặp khó khi gặp lỗi hỏng, ThinkPro có Trung tâm bảo vệ quyền lợi khách hàng</p>
                            <p className='mt-2'>Để không bỏ sót bất kỳ một trải nghiệm không tốt nào của khách hàng, Ban Lãnh Đạo Tập đoàn có chuyên trang bảo vệ quyền lợi khách hàng.</p>
                        </div>
                        <div className="col-3" style={{backgroundColor: 'rgb(245,253,255)'}}>
                            <i className='bi bi-info-circle-fill' style={{color: '#00D4FF', fontSize:'1.3em'}}></i>
                            <p className='mt-3' style={{fontWeight: '600'}}>Bạn bận, ThinkPro phục vụ từ sáng tới khuya.</p>
                            <p className='mt-2'>Khách hàng bận bịu. Cán bộ, nhân viên ThinkPro càng phải phục vụ ngoài giờ để trải nghiệm của khách hàng được thông suốt.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Home;