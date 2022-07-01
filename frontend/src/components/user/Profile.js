import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Thông tin cá nhân'} />

                    <h2 className="mt-5 ml-5">Thông tin cá nhân</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src="../images/default_avatar.jpg" alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Chỉnh sửa thông tin cá nhân
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Tên</h4>
                            <p>{user.name}</p>

                            <h4>Địa chỉ email</h4>
                            <p>{user.email}</p>

                            <h4>Ngày đăng ký</h4>
                            <p>{String(user.createAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    Các đơn đặt hàng
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Thay đổi mật khẩu
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile