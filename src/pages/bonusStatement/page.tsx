import Aos from "aos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

import BonusModal from "./bonusModal";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import { getAllUsersApi, getBonusApi } from "../../api/api";
import BonusStatementTable from "../../components/BonusStatement/BonusStatementTable";

const BonusStatement = ({ darkTheme }: any) => {

  const [data, setData] = useState([]);
  const [users, setUsers] = useState<any>([]);
  const [bonusType, setBonusType] = useState("refill");
  const [giveBonusModal, setBonusModal] = useState(false);
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const [bonusAmountType, setBonusAmountType] = useState('percentage');
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);

  const [selectedRow, setSelectedRow] = useState(null);

  const [joiningModal, setJoiningModal] = useState(false);
  const [refillModal, setRefillModal] = useState(false);
  const [olderModal, setOlderModal] = useState(false);

  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  useEffect(() => {
    Aos.init({ once: true });
    fn_getUser();
    fn_getBonus();
  }, []);

  const openBonusModal = () => {
    setBonusModal(true);
  };

  const closeBonusModal = () => {
    setBonusModal(false);
    setBonusType("refill");
    setBonusAmountType("percentage");
    setJoiningModal(false);
    setRefillModal(false);
    setOlderModal(false);
  };

  const fn_getUser = async () => {
    const response = await getAllUsersApi();
    if (response?.status) {
      setUsers(response?.data?.map((item: any) => {
        return { label: item?.username, value: item?._id }
      }));
    }
  };

  const fn_getBonus = async () => {
    const response = await getBonusApi();
    if (response?.status) {
      setData(response?.data);
    } else {
      setData([]);
    }
  };

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"bonusStatement"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
          }`}
      >
        <Navbar
          pageName={"Bonus Statement"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">

          {localStorage.getItem('loginType') !== 'admin' && (
            <div className="mb-[15px] flex justify-end">
              <button
                className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm pt-[1px] font-[500] text-[15px]"
                style={{
                  backgroundColor: colors.text,
                  color: colors.light,
                }}
                onClick={openBonusModal}
              >
                <FaPlus className="inline-block mt-[-4px] me-[5px]" /> Add Bonus
              </button>
            </div>
          )}

          <div
            className="rounded-[15px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <BonusStatementTable
              colors={colors}
              data={data}
              closeBonusModal={closeBonusModal}
              joiningModal={joiningModal}
              setSelectedRow={setSelectedRow}
              setJoiningModal={setJoiningModal}
              selectedRow={selectedRow}
              fn_getBonus={fn_getBonus}
              refillModal={refillModal}
              setRefillModal={setRefillModal}
              olderModal={olderModal}
              setOlderModal={setOlderModal}
            />
          </div>

        </div>
      </div>
      <BonusModal fn_getBonus={fn_getBonus} giveBonusModal={giveBonusModal} closeBonusModal={closeBonusModal} bonusType={bonusType} setBonusType={setBonusType} users={users} bonusAmountType={bonusAmountType} setBonusAmountType={setBonusAmountType} colors={colors} data={data} />
    </div>
  );
};

export default BonusStatement;



