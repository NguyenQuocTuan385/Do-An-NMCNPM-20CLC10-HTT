import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import Sidebar from './Sidebar'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import { formatMoney } from '../product/Product'

const ProcessOrder = ({ match }) => {
    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const orderId = match.params.id

    useEffect(() => {
        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Cập nhật đơn hàng thành công')
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])

    const updateOrderHandler = (id) => {
        const formData = new FormData()
        formData.set('status', status)

        dispatch(updateOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address},${shippingInfo.city},
    ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h1 className="my-5">Order # {order && order._id}</h1>

                                    <h4 className="mb-4">Thông tin vận chuyển</h4>
                                    <p><b>Tên:</b> {user && user.name}</p>
                                    <p><b>Số điện thoại:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Địa chỉ:</b>{shippingDetails}</p>
                                    <p><b>Tổng chi phí:</b> {totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Thanh toán</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"} ><b>
                                        {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</b></p>

                                    <h4 className="my-4">Stripe ID</h4>
                                    <p><b>{paymentInfo && paymentInfo.id}</b></p>


                                    <h4 className="my-4">Trạng thái đơn hàng:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes
                                        ('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

                                    <h4 className="my-4">Các mặt hàng:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div className="row my-5" key={item.product} >
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`products/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>{formatMoney(item.price)}₫</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Số lượng</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Trạng thái đơn hàng</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() =>
                                        updateOrderHandler(order._id)}>
                                        Cập nhật trạng thái
                                    </button>
                                </div>

                            </div>

                        )}

                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder