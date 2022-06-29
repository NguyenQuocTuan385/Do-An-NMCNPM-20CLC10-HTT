import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1000, 1000000])
    const [category, setCategory] = useState('')

    const categories = [
        'Văn học',
        'Kinh Tế',
        'Tâm lý - Kỹ năng sống',
        'Truyện Thiếu Nhi',
        'Tiểu sử - Hồi ký',
        'Giáo Khoa - Sách tham khảo',
        'Sách học ngoại ngữ'
    ]

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } =
        useSelector(state => state.products)
    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category))


    }, [dispatch, alert, error, keyword, currentPage, price, category])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount

    if (keyword) {
        count = filteredProductsCount
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                    <h1 id="products_heading">Sách mới nhất</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range marks={{
                                                1000: `1.000₫`,
                                                1000000: `1.000.000₫`
                                            }}
                                                min={1000}
                                                max={1000000}
                                                defaultValue={[1000, 1000000]}
                                                tipFormatter={value => `${value}₫`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Thể Loại
                                                </h4>
                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                            key={category}
                                                            onClick={() => setCategory(category)
                                                            }
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default Home