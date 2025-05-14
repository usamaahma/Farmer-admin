import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Form,
    Input,
    Button,
    InputNumber,
    Typography,
    Divider,
    Row,
    Col,
    Card
} from 'antd';
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import './signup.css';

const { Title, Text } = Typography;

const FarmerSignup = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl] = useState('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
    const [crops, setCrops] = useState([]);
    const [currentCrop, setCurrentCrop] = useState('');

    const showSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = {
                name: values.name,
                email: values.email,
                role: "farmer",
                password: values.password,
                farmer: {
                    location: values.location,
                    contact: values.contact,
                    image: imageUrl,
                    experience: values.experience,
                    area: values.area,
                    mainCrops: crops,
                    details: values.details,
                }
            };

            const response = await auth.post('/register', data);

            if (response.status === 201 || response.data.success) {
                showSuccess('Registration successful! Redirecting to login...');
                form.resetFields();
                setCrops([]);
                setCurrentCrop('');

                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                showError(response.data.message || 'Registration failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Registration failed. Please try again.';
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const addCrop = () => {
        if (currentCrop && !crops.includes(currentCrop)) {
            setCrops([...crops, currentCrop]);
            setCurrentCrop('');
        } else if (!currentCrop) {
            showError('Please enter a crop name');
        }
    };

    const removeCrop = (cropToRemove) => {
        setCrops(crops.filter(crop => crop !== cropToRemove));
    };

    return (
        <div className="signup-container">
            <ToastContainer />
            <Card className="signup-card" hoverable>
                <Title level={2} className="text-center">
                    <span className="farmer-icon">👨‍🌾</span> Farmer Registration
                </Title>

                <Divider />

                <Form
                    form={form}
                    name="farmerRegister"
                    onFinish={onFinish}
                    layout="vertical"
                    scrollToFirstError
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Title level={4} className="section-title">Basic Information</Title>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="name"
                                label="Full Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="John Doe" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Please input a valid email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="john@example.com" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 8,
                                        message: 'Password must be at least 8 characters!',
                                    },
                                    {
                                        pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                                        message: 'Password must contain letters and numbers!',
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="At least 8 characters"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={16}>
                        <Col span={24}>
                            <Title level={4} className="section-title">Farmer Details</Title>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[{ required: true, message: 'Please input your location!' }]}
                            >
                                <Input
                                    prefix={<EnvironmentOutlined />}
                                    placeholder="Your farm location"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="contact"
                                label="Contact Number"
                                rules={[
                                    { required: true, message: 'Please input your contact number!' },
                                    {
                                        pattern: /^\+?\d{10,15}$/,
                                        message: 'Invalid phone number format!',
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="+1234567890"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="image"
                                label="Profile Image"
                            >
                                <div className="image-upload-container">
                                    <img
                                        src={imageUrl}
                                        alt="Farmer"
                                        className="profile-image"
                                    />
                                    <Text type="secondary" className="image-note">
                                        Using sample farmer image
                                    </Text>
                                </div>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="experience"
                                label="Years of Experience"
                                rules={[{ required: true, message: 'Please input your experience!' }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                    placeholder="5"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="area"
                                label="Farming Area (acres)"
                                rules={[{ required: true, message: 'Please input your farming area!' }]}
                            >
                                <InputNumber
                                    min={0}
                                    step={0.1}
                                    style={{ width: '100%' }}
                                    placeholder="10.5"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Main Crops"
                            >
                                <div className="crops-input-container">
                                    <Input
                                        value={currentCrop}
                                        onChange={(e) => setCurrentCrop(e.target.value)}
                                        placeholder="Add your crops (one at a time)"
                                        suffix={
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}
                                                onClick={addCrop}
                                            />
                                        }
                                        onPressEnter={addCrop}
                                    />
                                    <div className="crops-list">
                                        {crops.map((crop, index) => (
                                            <span className="crop-tag" key={index}>
                                                {crop}
                                                <DeleteOutlined
                                                    className="remove-icon"
                                                    onClick={() => removeCrop(crop)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="details"
                                label="Additional Details"
                            >
                                <Input.TextArea rows={4} placeholder="Tell us more about your farm..." />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            size="large"
                        >
                            Register Now
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        <Text>
                            Already have an account?{' '}
                            <a href="/login">Login here</a>
                        </Text>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default FarmerSignup;