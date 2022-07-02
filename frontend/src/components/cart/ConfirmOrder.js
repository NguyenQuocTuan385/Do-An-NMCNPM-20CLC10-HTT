import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { formatMoney } from '../product/Product'
import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    //Calculate Order Price
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 50000 ? 0 : 5000
    const taxPrice = Number((0.05 * itemsPrice))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice)
    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/')
    }

    return (
        <Fragment>
            <MetaData title={'Xác nhận thanh toán'} />

            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Thông tin vận chuyển:</h4>
                    <p><b>Tên:</b>{user && user.name}</p>
                    <p><b>Số điện thoại:</b>{shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Địa chỉ:</b>{`${shippingInfo.address}, ${shippingInfo.city}, 
                    ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Đơn hàng của bạn:</h4>

                    {cartItems.map(item => (
                        <Fragment>

                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x {formatMoney(item.price)}₫ = <b>{formatMoney(item.quantity * item.price)}₫</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}


                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Tổng đơn hàng</h4>
                        <hr />
                        <p>Chi phí mặt hàng:  <span className="order-summary-values">{formatMoney(itemsPrice)}₫</span></p>
                        <p>Chi phí vận chuyển: <span className="order-summary-values">{formatMoney(shippingPrice)}₫</span></p>
                        <p>Chi phí thuế:  <span className="order-summary-values">{formatMoney(taxPrice)}₫</span></p>

                        <hr />

                        <p>Tổng chi phí: <span className="order-summary-values">{formatMoney(totalPrice)}₫</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block"
                            onClick={processToPayment}>Tiến hành thanh toán</button>
                    </div>
                </div>


            </div>
        </Fragment>
    )
}

export default ConfirmOrder