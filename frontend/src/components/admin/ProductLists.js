import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions'
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { formatMoney } from '../product/Product'

const ProductLists = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Xóa sách thành công')
            history.push('/admin/products')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Chi phí',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Số lượng sách',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Chức năng',
                    field: 'actions',
                }
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `${formatMoney(product.price)}₫`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    return (
        <Fragment>
            <MetaData title={'Tất cả sách'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">
                            Tất cả sách
                        </h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductLists