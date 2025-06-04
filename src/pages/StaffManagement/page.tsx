import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import StaffManagementTable from "../../components/StaffManagement/StaffManagementTable";
import StaffManagementCreateModel from "../../components/StaffManagement/StaffManagementCreateModel";

import { getStaffsApi } from "../../api/api";

const StaffManagement = ({ darkTheme }: any) => {

    const [data, setData] = useState([]);
    const [createStaff, setCreateStaff] = useState(false);

    const smallSidebar = useSelector((state: any) => state.smallSidebar);
    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    useEffect(() => {
        fn_getStaffs();
    }, []);

    const fn_getStaffs = async () => {
        const response = await getStaffsApi();
        if (response?.status) {
            setData(response?.data?.data);
        } else {
            setData([]);
        }
    };

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"staffManagement"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
                    }`}
            >
                <Navbar pageName={"Master Management"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px]">
                    <div className="flex justify-end mb-[15px]">
                        <button
                            style={{ backgroundColor: colors.text, color: colors.light }}
                            onClick={() => setCreateStaff(true)}
                            className="h-[40px] px-[20px] rounded-[7px] w-[max-content] text-nowrap font-[500] flex justify-center items-center text-[15px] gap-[7px]"
                        >
                            <span><FaPlus /></span>
                            Add Master
                        </button>
                    </div>
                    {createStaff && <StaffManagementCreateModel createStaff={createStaff} setCreateStaff={setCreateStaff} fn_getStaffs={fn_getStaffs} />}
                    <StaffManagementTable colors={colors} data={data} fn_getStaffs={fn_getStaffs} />
                </div>
            </div>
        </div>
    );
};

export default StaffManagement;
