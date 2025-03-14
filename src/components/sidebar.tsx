import { useDispatch, useSelector } from "react-redux";

// import { GiNotebook } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuWallet2 } from "react-icons/lu";
// import { FaHandHoldingDollar } from "react-icons/fa6";
import { SiBetfair } from "react-icons/si";
import { MdAutoGraph, MdCasino, MdOutlineHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
// import { BsBank } from "react-icons/bs";
import { ImCreditCard } from "react-icons/im";

import { updateSmallsidebar } from "../features/features";
import { FaUser } from "react-icons/fa";
import { AiOutlineDesktop } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";

const Sidebar = ({ colors, path }: any) => {
  const dispatch = useDispatch();
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const loginType = useSelector((state: any) => state.loginType) || localStorage.getItem('loginType');
  return (
    <div
      className={`fixed min-h-[100vh] z-[9] shadow-lg lg:shadow-none transition-all duration-500 ${smallSidebar ? "w-[50px]" : "w-[260px]"
        }`}
      style={{ backgroundColor: colors.light }}
    >
      <RiArrowLeftDoubleLine
        className={`text-[18px] absolute top-[10px] cursor-pointer transition-all duration-300 ${smallSidebar ? "-rotate-180 right-[15px]" : "right-[10px]"
          }`}
        onClick={() => dispatch(updateSmallsidebar(!smallSidebar))}
        style={{ color: colors.text }}
      />
      {!smallSidebar && (
        <p
          className="text-[25px] text-center font-[500] mt-[40px]"
          style={{ color: colors.text }}
        >
          Shubh Exchange
        </p>
      )}
      <div className={`flex flex-col gap-[5px] ${smallSidebar ? "mt-[50px]" : "mt-[20px]"}`}>
        <Menus
          title={"Dashboard"}
          colors={colors}
          pathEquals={"dashboard"}
          path={path}
          url={"/dashboard"}
          icon={<LuLayoutDashboard className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        {/* <Menus
          title={"Games"}
          colors={colors}
          pathEquals={"games"}
          path={path}
          url={"/games"}
          icon={<MdCasino className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={(loginType === "staff" || loginType === "master") ? true : false}
        /> */}
        <Menus
          title={"Users"}
          colors={colors}
          pathEquals={"users"}
          path={path}
          url={"/users"}
          icon={<FaUser className="text-[18px] me-[3px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        <Menus
          title={"Bets"}
          colors={colors}
          pathEquals={"bets"}
          path={path}
          url={"/bets"}
          icon={<SiBetfair className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        <Menus
          title={"My Wallet"}
          colors={colors}
          pathEquals={"wallet"}
          path={path}
          url={"/wallet"}
          icon={<LuWallet2 className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        {/* <Menus
          title={"Deposit/Withdraw"}
          colors={colors}
          pathEquals={"depositWithdraw"}
          path={path}
          url={"/deposit-withdraw"}
          icon={<BsBank className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        /> */}
        {/* <Menus
          title={"Account Statement"}
          colors={colors}
          pathEquals={"accountStatement"}
          path={path}
          url={"/account-statement"}
          icon={<GiNotebook className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        /> */}
        {/* <Menus
          title={"Bonus Statement"}
          colors={colors}
          pathEquals={"bonusStatement"}
          path={path}
          url={"/bonus-statement"}
          icon={<FaHandHoldingDollar className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        /> */}
        <Menus
          title={"Payment Information"}
          colors={colors}
          pathEquals={"payment"}
          path={path}
          url={"/payment-info"}
          icon={<ImCreditCard className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        <Menus
          title={"Deposit/Withdraw Requests"}
          colors={colors}
          pathEquals={"deposit-withdraw"}
          path={path}
          url={"/deposit-withdraw"}
          icon={<BsBank className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        <Menus
          title={"Web Settings"}
          colors={colors}
          pathEquals={"web"}
          path={path}
          url={"/web-settings"}
          icon={<AiOutlineDesktop className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={(loginType === "staff" || loginType === "master") ? true : false}
        />
        <Menus
          title={"Login History"}
          colors={colors}
          pathEquals={"loginHistory"}
          path={path}
          url={"/login-history"}
          icon={<MdOutlineHistory className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "staff" ? true : false}
        />
        <Menus
          title={"Master Management"}
          colors={colors}
          pathEquals={"staffManagement"}
          path={path}
          url={"/master-management"}
          icon={<IoPeople className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={(loginType === "staff" || loginType === "master") ? true : false}
        />
        {/* <Menus
          title={"Fancy Market"}
          colors={colors}
          pathEquals={"fancyData"}
          path={path}
          url={"/fancy-data"}
          icon={<MdAutoGraph className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "master" ? true : false}
        /> */}
        {/* <Menus
          title={"Bookmaker Market"}
          colors={colors}
          pathEquals={"bookmakerData"}
          path={path}
          url={"/bookmaker-data"}
          icon={<MdAutoGraph className="text-[20px]" />}
          smallSidebar={smallSidebar}
          disabled={loginType === "master" ? true : false}
        /> */}
      </div>
    </div>
  );
};

export default Sidebar;

const Menus = ({
  title,
  colors,
  pathEquals,
  path,
  url,
  icon,
  smallSidebar,
  disabled
}: any) => {
  return (disabled ? (
    <p
      className={`account-sidebar-menu-disabled`}
      style={{
        color: colors.text,
        backgroundColor: "rgb(200, 200, 200)",
        cursor: "not-allowed"
      }}
    >
      {icon}
      {!smallSidebar && <p>{title}</p>}
    </p>
  ) : (
    <Link
      to={url}
      className={`account-sidebar-menu`}
      style={{
        color: colors.text,
        backgroundColor: path === pathEquals && colors.dark
      }}
    >
      {icon}
      {!smallSidebar && <p>{title}</p>}
    </Link>
  )
  );
};
