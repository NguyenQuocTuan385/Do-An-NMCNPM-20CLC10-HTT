import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'

import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = ({ match, history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Văn học')
    const [stock, setStock] = useState(0)
    const [publishingCompany, setPublishingCompany] = useState('')
    const [author, setAuthor] = useState('')
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)
    const productId = match.params.id
    const categories = [
        'Văn học',
        'Kinh Tế',
        'Tâm lý - Kỹ năng sống',
        'Truyện Thiếu Nhi',
        'Tiểu sử - Hồi ký',
        'Giáo Khoa - Sách tham khảo',
        'Sách học ngoại ngữ'
    ]


    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        }
        else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setAuthor(product.author)
            setPublishingCompany(product.publishingCompany)
            setStock(product.stock)
            setOldImages(product.images)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }


        if (isUpdated) {
            history.push('/admin/products')
            alert.success('Cập nhật sách thành công')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, product, productId])

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
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'Cập nhật sách'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Cập nhật sách</h1>

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
                                        onChange={(e) => {
                                            if (e.target.value < 0)
                                                setPrice(-e.target.value)
                                            else
                                                setPrice(e.target.value)
                                        }}
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
                                        onChange={(e) => {
                                            if (e.target.value < 0)
                                                setStock(-e.target.value)
                                            else
                                                setStock(e.target.value)
                                        }}
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
                                <div className='form-group'>
                                    <label>Ảnh</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Chọn ảnh
                                        </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview"
                                            className="mt- mr-2" width="55" height="52" />
                                    ))}
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Cập nhật
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct