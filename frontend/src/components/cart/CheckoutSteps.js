import React from 'react'
import { Link } from 'react-router-dom'
const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">
            {shipping ? <Link to='shipping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Vận chuyển</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Vận chuyển</div>
                <div className="triangl-incomplete"></div>
            </Link>}

            {confirmOrder ? <Link to='/orders/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Xác nhận đơn hàng</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Xác nhận đơn hàng</div>
                <div className="triangl-incomplete"></div>
            </Link>}
            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Thanh toán</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Thanh toán</div>
                <div className="triangl-incomplete"></div>
            </Link>}
        </div>
    )
}

export default CheckoutSteps