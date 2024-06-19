import { Menu } from "antd";
import { useState, useEffect } from "react";
import {
  BookOutlined,
  RollbackOutlined,
  AreaChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTasks, FaUser, FaUsers } from "react-icons/fa";
import { MdTaskAlt, MdOutlinePendingActions } from "react-icons/md";

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleMenuSelect = (e) => {
    setSelectedKeys([e.key]);
    navigate(e.key);
  };

  const menuItems = [
    {
      key: "/admindashboard",
      icon: <BookOutlined />,
      label: "Courses",
    },
    {
      key: "/students",
      icon: <TeamOutlined />,
      label: "Students",
    },
    {
      key: "/enrollments",
      icon: <MdTaskAlt />,
      label: "Enrollements",
    },
    {
      key: "#",
      icon: <FaUser />,
      label: "Profile",
    },
    {
      key: "/",
      icon: <RollbackOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Menu
      theme="dark"
      className="menu-bar"
      selectedKeys={selectedKeys}
      onClick={handleMenuSelect}
      items={menuItems}
    />
  );
};

export default MenuList;
