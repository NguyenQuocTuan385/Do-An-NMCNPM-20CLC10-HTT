import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import Sidebar from './Sidebar'

const NewProduct = ({ history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Văn học')
    const [stock, setStock] = useState(0)
    const [publishingCompany, setPublishingCompany] = useState('')
    const [author, setAuthor] = useState('')

    const categories = [
        'Văn học',
        'Kinh Tế',
        'Tâm lý - Kỹ năng sống',
        'Truyện Thiếu Nhi',
        'Tiểu sử - Hồi ký',
        'Giáo Khoa - Sách tham khảo',
        'Sách học ngoại ngữ'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newProduct)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/products')
            alert.success('Thêm sách thành công')
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('price', price)
        formData.set('description', description)
        formData.set('category', category)
        formData.set('stock', stock)
        formData.set('publishingCompany', publishingCompany)
        formData.set('author', author)

        dispatch(newProduct(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Thêm sách'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Sách mới</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Giá</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Mô tả chi tiết</label>
                                    <textarea className="form-control" id="description_field" rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Thể loại</label>
                                    <select className="form-control" id="category_field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}> {category}</option>
                                        ))}
                                        <option>Others</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Số lượng sách</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="author_field">Tác giả</label>
                                    <input
                                        type="text"
                                        id="author_field"
                                        className="form-control"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="publishingCompany_field">Nhà xuất bản</label>
                                    <input
                                        type="text"
                                        id="publishingCompany_field"
                                        className="form-control"
                                        value={publishingCompany}
                                        onChange={(e) => setPublishingCompany(e.target.value)}
                                    />
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct