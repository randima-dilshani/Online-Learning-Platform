import { Menu } from "antd";
import { useState, useEffect } from "react";
import {
  HomeOutlined,
  RollbackOutlined,
  AreaChartOutlined,
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
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/taskdetails",
      icon: <FaTasks />,
      label: "Tasks",
    },
    {
      key: "/completedtasks",
      icon: <MdTaskAlt />,
      label: "Completed",
    },
    {
      key: "/inprogresstasks",
      icon: <AreaChartOutlined />,
      label: "In Progress",
    },
    {
      key: "/pendingtasks",
      icon: <MdOutlinePendingActions />,
      label: "To Do",
    },
    {
      key: "/team",
      icon: <FaUsers />,
      label: "Team",
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
