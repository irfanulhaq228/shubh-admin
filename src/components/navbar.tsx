import { Drawer } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { IoMoon, IoNotificationsCircle, IoSunnySharp } from "react-icons/io5";

import { updateColorScheme, updateDarkTheme } from "../features/features";

const Navbar = ({ pageName, darkTheme, colors }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const admin = useSelector((state: any) => state.admin);

  const handleProfileClick = () => {
    setProfilePopup(!profilePopup);
    setNotificationPopup(false);
  };

  const fn_logout = () => {
    Cookies.remove('adminToken');
    Cookies.remove('masterToken');
    localStorage.removeItem('loginType');
    navigate("/");
  };

  return (
    <>
      <div className="mt-[20px] mx-[10px] sm:mx-[20px] flex flex-col-reverse sm:flex-row gap-[5px] items-center justify-between">
        <p
          className={`font-[600] text-[18px] sm:text-[20px] md:text-[25px] capitalize`}
          style={{ color: colors.text }}
        >
          {pageName}
        </p>
        <div
          className="w-[max-content] h-[60px] rounded-full  flex items-center px-[20px]"
          style={{ backgroundColor: colors.light }}
        >
          <div className="flex items-center gap-[10px]">
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center relative`}
              style={{ backgroundColor: colors.dark }}
              onClick={() => setNotificationPopup(!notificationPopup)}
            >
              <IoIosNotifications style={{ color: colors.text }} />
              <div className="absolute bg-red-500 w-[15px] h-[15px] text-[11px] flex justify-center items-center text-white font-[600] rounded-full leading-[12px] top-[-3px] right-[-3px]">1</div>
              {notificationPopup && (
                <div className="absolute z-[99] w-[200px] border bg-gray-100 shadow-lg top-[30px] right-0 rounded-[10px] p-[10px] flex flex-col gap-[10px]">
                  <Link to={"/users"} className="flex items-center gap-[8px] bg-white rounded-[10px] p-[10px]">
                    <IoNotificationsCircle className="text-[35px]" style={{ color: colors.text }} />
                    <div>
                      <p className="text-[14px] font-[600] leading-[15px]">New User Added</p>
                      <p className="text-[13px] font-[500]">1h</p>
                    </div>
                  </Link>
                  <Link to={"/games"} className="flex items-center gap-[8px] bg-white rounded-[10px] p-[10px]">
                    <IoNotificationsCircle className="text-[35px]" style={{ color: colors.text }} />
                    <div>
                      <p className="text-[14px] font-[600] leading-[15px]">New Game Added</p>
                      <p className="text-[13px] font-[500]">1d</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
              onClick={() => setOpenDrawer(!openDrawer)}
              style={{ backgroundColor: colors.dark }}
            >
              <IoMdSettings style={{ color: colors.text }} />
            </div>
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
              onClick={() => dispatch(updateDarkTheme(!darkTheme))}
              style={{ backgroundColor: colors.dark }}
            >
              {darkTheme ? (
                <IoSunnySharp style={{ color: colors.text }} />
              ) : (
                <IoMoon style={{ color: colors.text }} />
              )}
            </div>
            <div
              className={`w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center relative`}
              style={{ backgroundColor: colors.dark }}
              onClick={handleProfileClick}
            >
              <FaUser style={{ color: colors.text }} />
              {profilePopup && (
                <div className="absolute z-[99] border bg-white shadow-lg top-[40px] right-0 rounded-[7px] p-[7px] flex flex-col gap-[10px]">
                  <button className="bg-white rounded-[7px] text-[14px] font-[500] p-[7px] w-[130px]" style={{ backgroundColor: colors.bg, color: colors.text }} onClick={fn_logout}>
                    <TbLogout2 className="inline-block text-[16px] mt-[-2px] mr-1.5" />Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title="Settings"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        style={{ fontFamily: "Roboto" }}
      >
        <p className="text-[15px] font-[600]">Select Theme</p>
        <div className="mt-[10px] flex gap-[10px]">
          <div
            className={`w-[30px] h-[30px] rounded-full cursor-pointer ${colorScheme === "color1" && "border border-[black]"
              }`}
            style={{ backgroundColor: colors.color1 }}
            onClick={() => dispatch(updateColorScheme("color1"))}
          ></div>
          <div
            className={`w-[30px] h-[30px] rounded-full cursor-pointer ${colorScheme === "color2" && "border border-[black]"
              }`}
            style={{ backgroundColor: colors.color2 }}
            onClick={() => dispatch(updateColorScheme("color2"))}
          ></div>
        </div>
        <hr className="my-[20px]" />
        <p className="text-[15px] font-[600]">Account Info</p>
        <div className="mt-[10px]">
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">E-mail</p>
            <p>{admin?.email}</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Website</p>
            <a target="_blank" href={admin?.domain || "https://shubhexchange.com"} className="underline text-blue-600">{admin?.domain || "https://shubhexchange.com"}</a>
          </div>
        </div>
        <hr className="my-[20px]" />
        <p className="text-[15px] font-[600]">Web Settings</p>
        <div className="mt-[10px]">
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Currency</p>
            <p>INR</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Time Zone</p>
            <p>GMT+0500</p>
          </div>
        </div>
        <button
          onClick={() => {
            Cookies.remove('adminToken');
            Cookies.remove('masterToken');
            Cookies.remove('loginType');
            navigate("/")
          }
          }
          className="w-full bg-gray-300 rounded-[4px] h-[35px] my-[15px] text-[15px] font-[500]"
        >
          Logout
        </button>
      </Drawer>
    </>
  );
};

export default Navbar;
