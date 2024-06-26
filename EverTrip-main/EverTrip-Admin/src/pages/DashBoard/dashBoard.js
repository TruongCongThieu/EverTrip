import {
    ContactsTwoTone,
    DashboardOutlined,
    EnvironmentTwoTone,
    FolderOpenTwoTone,
    HddTwoTone,
    HomeOutlined,
    NotificationTwoTone,
    ProfileTwoTone,
    ShoppingTwoTone
} from '@ant-design/icons';
import {
    BackTop,
    Breadcrumb,
    Card,
    Col,
    Row,
    Spin,
    Tag
} from 'antd';
import React, { useEffect, useState } from 'react';
import dashBoardApi from "../../apis/dashBoardApi";
import "./dashBoard.css";
import campgroundApi from '../../apis/campgroundApi';
import postsApi from '../../apis/postsApi';
import userApi from '../../apis/userApi';
import statsApi from '../../apis/statsApi';
import servicesApi from '../../apis/servicesApi';
import bookingApi from '../../apis/bookingApi';


const DashBoard = () => {
    const [statisticList, setStatisticList] = useState([]);
    const [totalResult, setTotalResult] = useState([]);
    const [service, setService] = useState([]);
    const [booking, setBooking] = useState([]);

    const [loading, setLoading] = useState(true);
    const [total, setTotalList] = useState();
    const [area, setArea] = useState(null);
    const [userData, setUserData] = useState([]);


    useEffect(() => {
        (async () => {
            try {

                const response = await userApi.getProfile();
                console.log(response);
                setUserData(response.user);

                await postsApi.getAllPosts().then((res) => {
                    console.log(res);
                    setTotalList(res)
                    setLoading(false);
                });

                await campgroundApi.getAllCampgrounds().then((res) => {
                    console.log(res);
                    setArea(res)
                    setLoading(false);
                });

                await servicesApi.getAllServices().then((res) => {
                    console.log(res);
                    setService(res)
                    setLoading(false);
                });

                await userApi.listUserByAdmin().then((res) => {
                    console.log(res);
                    setStatisticList(res.data);
                    setLoading(false);
                });

                if (response.user.role == "isAdmin") {

                    await statsApi.getStats().then((res) => {
                        console.log(res);
                        setTotalResult(res);
                        setLoading(false);
                    });
                } else {
                    await statsApi.getStatsByUserId(response.user.id).then((res) => {
                        console.log(res);
                        setTotalResult(res);
                        setLoading(false);
                    });

                    await bookingApi.getAllBookingsByUser(response.user.id).then((res) => {
                        console.log(res);
                        setBooking(res);
                        setLoading(false);
                    });
                }



            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={false}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <DashboardOutlined />
                                <span>DashBoard</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {userData?.role == "isAdmin" ?
                        <Row gutter={12} style={{ marginTop: 20 }}>
                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{statisticList?.length}</div>
                                            <div className='title_total'>Số thành viên</div>
                                        </div>
                                        <div>
                                            <ContactsTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{total?.length}</div>
                                            <div className='title_total'>Tổng bài đăng</div>
                                        </div>
                                        <div>
                                            <NotificationTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{area?.length}</div>
                                            <div className='title_total'>Tổng khu cắm trại</div>
                                        </div>
                                        <div>
                                            <EnvironmentTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            
                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{service?.length}</div>
                                            <div className='title_total'>Tổng dịch vụ</div>
                                        </div>
                                        <div>
                                            <ProfileTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            
                        </Row> :

                        <Row gutter={12} style={{ marginTop: 20 }}>
                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>
                                                {Number(totalResult?.userServicesRevenue)?.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }) || '0 VND'}
                                            </div>
                                            <div className='title_total'>Tổng giá trị dịch vụ</div>
                                        </div>
                                        <div>
                                            <ContactsTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{totalResult?.userServicesCount}</div>
                                            <div className='title_total'>Tổng dịch vụ</div>
                                        </div>
                                        <div>
                                            <NotificationTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{totalResult?.userCampgroundsCount}</div>
                                            <div className='title_total'>Tổng khu cắm trại</div>
                                        </div>
                                        <div>
                                            <EnvironmentTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card className="card_total" bordered={false}>
                                    <div className='card_number'>
                                        <div>
                                            <div className='number_total'>{booking?.length}</div>
                                            <div className='title_total'>Tổng số đặt vé</div>
                                        </div>
                                        <div>
                                            <ProfileTwoTone style={{ fontSize: 48 }} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    }
                </div>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default DashBoard;