import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title={'Thanh toán đơn hàng thành công'} />
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto"
                        src="/images/order_success.jpg"
                        alt="Thanh toán đơn hàng thành công" width="200" height="200" />

                    <h2>Đơn hàng của bạn đã thanh toán thành công.</h2>

                    <Link to="/order">Đi tới quản lý giỏ hàng</Link>
                </div>

            </div>
        </Fragment>
    )
}

export default OrderSuccess