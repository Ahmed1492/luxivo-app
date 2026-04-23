import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from '../../redux/authReducer';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

const statusColor = { Delivered: '#43a047', Shipped: '#1e88e5', Processing: '#fb8c00', Cancelled: '#e53935' };

export const Profile = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const user       = useSelector((state) => state.auth.user);
  const cartCount  = useSelector((state) => state.cart.products.length);
  const orders     = useSelector((state) => state.orders.orders);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saved, setSaved] = useState(false);

  if (!user) { navigate('/'); return null; }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    dispatch(updateProfile(form));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="profile-page">
      {/* Header Banner */}
      <div className="profile-banner">
        <div className="spaceX banner-inner">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-banner-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          <button className="logout-top-btn" onClick={handleLogout}>
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>

      <div className="spaceX profile-body">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          {[
            { key: 'overview', icon: <PersonOutlineIcon />, label: 'Overview' },
            { key: 'orders',   icon: <ShoppingBagOutlinedIcon />, label: 'My Orders' },
            { key: 'settings', icon: <EditOutlinedIcon />, label: 'Edit Profile' },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              className={`sidebar-item ${activeTab === key ? 'active' : ''}`}
              onClick={() => { setActiveTab(key); setIsEditing(key === 'settings'); }}
            >
              {icon} {label}
            </button>
          ))}
          <div className="sidebar-divider" />
          <Link to="/support" className="sidebar-item">
            <SupportAgentOutlinedIcon /> Support
          </Link>
          <button className="sidebar-item logout" onClick={handleLogout}>
            <LogoutIcon /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {saved && (
            <div className="save-toast">✓ Profile updated successfully!</div>
          )}

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Account Overview</h2>
              <div className="overview-cards">
                <div className="ov-card">
                  <ShoppingBagOutlinedIcon />
                  <div>
                    <span>{orders.length}</span>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="ov-card">
                  <LocalShippingOutlinedIcon />
                  <div>
                    <span>{orders.filter(o => o.status === 'Shipped').length}</span>
                    <p>In Transit</p>
                  </div>
                </div>
                <div className="ov-card">
                  <ShoppingBagOutlinedIcon className="cart-ov" />
                  <div>
                    <span>{cartCount}</span>
                    <p>Cart Items</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Personal Information</h3>
                <div className="info-row">
                  <PersonOutlineIcon />
                  <div>
                    <label>Full Name</label>
                    <p>{user.name}</p>
                  </div>
                </div>
                <div className="info-row">
                  <EmailOutlinedIcon />
                  <div>
                    <label>Email Address</label>
                    <p>{user.email}</p>
                  </div>
                </div>
                <button className="edit-inline-btn" onClick={() => setActiveTab('settings')}>
                  <EditOutlinedIcon /> Edit Profile
                </button>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <h2>My Orders</h2>
              {orders.length === 0 ? (
                <div className="orders-empty">
                  <ReceiptOutlinedIcon />
                  <p>No orders yet</p>
                  <Link to="/" className="edit-inline-btn" style={{ textDecoration: 'none' }}>Start Shopping</Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      {/* Order header — click to expand */}
                      <div
                        className="order-header"
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      >
                        <div className="order-left">
                          <ShoppingBagOutlinedIcon />
                          <div>
                            <p className="order-id">{order.id}</p>
                            <p className="order-date">
                              {order.date} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </div>
                        <div className="order-right">
                          <p className="order-total">${order.total}</p>
                          <span
                            className="order-status"
                            style={{ color: statusColor[order.status], background: statusColor[order.status] + '18' }}
                          >
                            {order.status}
                          </span>
                          <ExpandMoreIcon
                            className={`order-expand-icon ${expandedOrder === order.id ? 'open' : ''}`}
                          />
                        </div>
                      </div>

                      {/* Expanded items */}
                      {expandedOrder === order.id && (
                        <div className="order-items">
                          {order.shipping && (
                            <div className="order-shipping-info">
                              <LocalShippingOutlinedIcon />
                              <span>
                                {order.shipping.address}, {order.shipping.city}, {order.shipping.country}
                              </span>
                            </div>
                          )}
                          <div className="order-items-list">
                            {order.items.map((item, i) => (
                              <Link to={`/product/${item.id}`} key={i} className="order-item">
                                <div className="order-item-img">
                                  <img src={item.image} alt={item.title} />
                                </div>
                                <div className="order-item-info">
                                  <p className="order-item-title">{item.title}</p>
                                  <p className="order-item-meta">
                                    Qty: {item.quantity} · ${item.price} each
                                  </p>
                                </div>
                                <p className="order-item-total">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </Link>
                            ))}
                          </div>
                          <div className="order-items-footer">
                            <span>Order Total</span>
                            <strong>${order.total}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>Edit Profile</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label><PersonOutlineIcon /> Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label><EmailOutlinedIcon /> Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                  />
                </div>
                <div className="settings-actions">
                  <button className="save-btn" onClick={handleSave}>
                    <SaveOutlinedIcon /> Save Changes
                  </button>
                  <button className="cancel-btn" onClick={() => setActiveTab('overview')}>
                    <CloseIcon /> Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
