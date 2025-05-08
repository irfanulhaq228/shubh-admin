import Aos from "aos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import WalletTable from "../../components/Wallet/Table";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { ModalDepositRequest } from "../../components/ModalDepositRequest";
import { GetDepositRequestApi } from "../../api/api";

const Wallet = ({ darkTheme }: any) => {
  const dispatch = useDispatch();
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);

  const admin = useSelector((state: any) => state.admin);
  const wallet = useSelector((state: any) => state.wallet);
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  const [depositOpen, setDepositOpen] = useState(false);
  const [depositValue, setDepositValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    Aos.init({ once: true });
    fn_getDeposits();
  }, []);

  const fn_closeModal = async () => {
    setDepositOpen(false);
    setDepositValue('');
  };

  const fn_getDeposits = async () => {
    const response = await GetDepositRequestApi();
    if (response?.status) {
      setData(response?.data);
    }
  };

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"wallet"} />
      <ModalDepositRequest colors={colors} dispatch={dispatch} open={depositOpen} fn_closeModal={fn_closeModal} value={depositValue} setValue={setDepositValue} fn_getDeposits={fn_getDeposits} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
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
          <div className="mt-[20px] px-[10px] sm:px-[20px]">
            {/* boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] sm:gap-[15px]">
              <Boxes
                colors={colors}
                sub="Deposit Points For Approval"
                main={admin?.pendingDeposit || 0}
                icon={<FaIndianRupeeSign className="pt-[2px]" />}
                panelMainColor={colors.bg}
                panelSecColor={colors.text}
                button={true}
                setOpen={setDepositOpen}
                buttonText={"Request for Deposit Points"}
              />
              <Boxes
                colors={colors}
                sub="Withdraw Points For Approval"
                main={0}
                icon={<FaIndianRupeeSign className="pt-[2px]" />}
                panelMainColor={colors.bg}
                panelSecColor={colors.text}
                button={false}
                setOpen={setDepositOpen}
                buttonText={"Request for Withdraw Points"}
              />
            </div>
          </div>
          <div
            className="my-[10px] sm:my-[15px] rounded-[15px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <WalletTable colors={colors} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

const Boxes = ({ colors, sub, main, icon, panelMainColor, panelSecColor, button, setOpen, buttonText }: {
  colors: any;
  sub: string;
  main: string | number;
  icon: any;
  panelMainColor: string;
  panelSecColor: string;
  button: boolean;
  setOpen: any;
  buttonText: string
}) => {
  return (
    <div
      className={`min-h-[70px] md:min-h-[100px] rounded-[22px] flex items-center px-[12px] md:px-[20px] gap-[20px]`}
      style={{ backgroundColor: colors.dark }}
    >
      <div
        className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full flex items-center justify-center text-[20px] md:text-[24px]"
        style={{ backgroundColor: panelMainColor, color: panelSecColor }}
      >
        {icon}
      </div>
      <div className="flex flex-row flex-1 justify-between items-center">
        <div>
          <p className="text-[13px] md:text-[15px] text-gray-400 font-[500] leading-[13px] md:leading-[15px]">
            {sub}
          </p>
          <p className="text-[18px] md:text-[22px] font-[700]" style={{ color: panelSecColor }}>
            {main}
          </p>
        </div>
        {button && (
          <button className="text-[14px] font-[500] h-[35px] px-[20px] rounded-[8px]" style={{ backgroundColor: panelSecColor, color: panelMainColor }} onClick={() => setOpen(true)}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
