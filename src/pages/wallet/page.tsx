import Aos from "aos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
// import WalletTable from "../../components/Wallet/Table";

import { FaIndianRupeeSign } from "react-icons/fa6";

const Wallet = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const wallet = useSelector((state: any) => state.wallet);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"wallet"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
        }`}
      >
        <Navbar pageName={"My Wallet"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <p
            className="text-center text-[20px] sm:text-[25px] font-[700]"
            style={{ color: colors.text }}
          >
            Available Balance
          </p>
          <p
            className="text-center text-[30px] sm:text-[40px] font-[700] mt-[10px] flex items-center justify-center"
            style={{ color: colors.text }}
          >
            <FaIndianRupeeSign />{wallet}
          </p>
          {/* <div
            className="my-[10px] sm:my-[15px] rounded-[22px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <WalletTable colors={colors} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
