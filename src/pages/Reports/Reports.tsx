import { Pagination } from 'antd';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ReportsTable from "./ReportsTable";
import { fn_getReportsApi } from "../../api/api";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";

const Reports = ({ darkTheme }: any) => {

    const smallSidebar = useSelector((state: any) => state.smallSidebar);
    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);
    const [loader, setLoader] = useState(false);

    const limit = 20;
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [accountType, setAccountType] = useState("");

    useEffect(() => {
        fn_getReports(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        fn_getReports(1);
    }, [accountType]);

    const fn_getReports = async (page: any) => {
        try {
            setLoader(true);
            const response = await fn_getReportsApi(accountType, limit, page);
            if (response?.status) {
                setLoader(false);
                setData(response?.data);
                setTotalRecords(response?.totalRecords)
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"reports"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"}`}
            >
                <Navbar pageName={"Reports"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px]">
                    <div className="mb-[15px] flex justify-end">
                        <select
                            className="w-[180px] h-[35px] rounded-[7px] shadow-sm font-[500] border text-[12px] px-[5px] focus:outline-none cursor-pointer"
                            style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                borderColor: colors.text,
                            }}
                            onChange={(e) => setAccountType(e.target.value)}
                        >
                            <option value={""}>Select Account Type</option>
                            <option value={"deposit"}>Deposit</option>
                            <option value={"withdraw"}>Withdraw</option>
                        </select>
                    </div>
                    <div className='pb-[15px]' style={{ backgroundColor: colors.dark }}>
                        <ReportsTable colors={colors} data={data} loader={loader} />
                        <div className='mt-[15px] flex justify-end px-[15px]'>
                            <Pagination
                                defaultCurrent={1}
                                current={currentPage}
                                total={totalRecords}
                                showSizeChanger={false}
                                pageSize={limit}
                                onChange={(e) => setCurrentPage(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
