import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
// import Table1 from "../../components/Dashboard/Table1";
import useColorScheme from "../../hooks/useColorScheme";
import { getAdminDashboardDataApi } from "../../api/api";

import { RiUserSharedFill } from "react-icons/ri";
import { SiBetfair, SiNintendogamecube } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Profile = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  const [newUsers, setNewUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [runningBets, setRunningBets] = useState(0);
  const [runningGames, setRunningGames] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  useEffect(() => {
    Aos.init({ once: true });
    fn_getDashboardBoxesData();
  }, []);

  const fn_getDashboardBoxesData = async () => {
    const response = await getAdminDashboardDataApi();
    if (response?.status) {
      setNewUsers(response?.data?.newUsers);
      setTotalUsers(response?.data?.totalUsers);
      setRunningBets(response?.data?.runningbets);
      setRunningGames(response?.data?.runningGames);
      setTotalDeposit(response?.data?.totalDeposits);
      setTotalWithdraw(response?.data?.totalWithdraws);
    }
  }

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"dashboard"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"Dashboard"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          {/* boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:sm:grid-cols-3 gap-[10px] sm:gap-[15px]">
            <Boxes
              colors={colors}
              sub="Total Users"
              main={totalUsers}
              icon={<FaUser className="text-[25px]" />}
            />
            <Boxes
              colors={colors}
              sub="New Users"
              main={newUsers}
              icon={<RiUserSharedFill className="text-[26px]" />}
            />
            <Boxes
              colors={colors}
              sub="Games to be Played"
              main={runningGames}
              icon={<SiNintendogamecube className="text-[26px]" />}
            />
            <Boxes
              colors={colors}
              sub="Running Bets"
              main={runningBets}
              icon={<SiBetfair />}
            />
            <Boxes
              colors={colors}
              sub="Total Deposit"
              main={totalDeposit}
              icon={<FaIndianRupeeSign />}
            />
            <Boxes
              colors={colors}
              sub="Total Withdraw"
              main={totalWithdraw}
              icon={<FaIndianRupeeSign />}
            />
          </div>
          {/* table & pagination */}
          {/* <div
            className="my-[10px] sm:my-[15px] rounded-[22px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <p className="text-[20px] font-[600] pt-[10px] pb-[5px] sm:pb-0 sm:pt-0 sm:my-[5px] ps-[15px] md:ps-0" style={{ color: colors.text }}>Running Games</p>
            <Table1 colors={colors} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const Boxes = ({
  colors,
  sub,
  main,
  icon,
}: {
  colors: any;
  sub: string;
  main: string | number;
  icon: any;
}) => {
  return (
    <div
      className={`min-h-[70px] md:min-h-[100px] rounded-[22px] flex items-center px-[12px] md:px-[20px] gap-[20px]`}
      style={{ backgroundColor: colors.dark }}
    >
      <div
        className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full flex items-center justify-center text-[20px] md:text-[24px]"
        style={{ backgroundColor: colors.light, color: colors.text }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[13px] md:text-[15px] text-gray-400 font-[500] leading-[13px] md:leading-[15px]">
          {sub}
        </p>
        <p className="text-[18px] md:text-[22px] font-[700]" style={{ color: colors.text }}>
          {main}
        </p>
      </div>
    </div>
  );
};
