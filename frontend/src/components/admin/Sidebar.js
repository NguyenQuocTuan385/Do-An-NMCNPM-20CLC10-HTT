import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Bảng điều khiển</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i>Quản lý Sách</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-clipboard"></i>Xem tất cả</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Thêm sách mới</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i>Quản lý đơn hàng</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i>Quản lý tài khoản</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-stars"></i>Quản lý bài đánh giá</Link>
                    </li>


                </ul>
            </nav>
        </div>
    )
}

export default Sidebar