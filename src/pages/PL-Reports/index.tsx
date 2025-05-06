import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { masterReportApi } from "../../api/api";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";

import PLReportsTable from "./PLReportsTable";

const PLReports = ({ darkTheme }: any) => {

    const smallSidebar = useSelector((state: any) => state.smallSidebar);
    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        fn_getMasterReport();
    }, []);

    const fn_getMasterReport = async () => {
        const response = await masterReportApi();
        if (response?.status) {
            setLoader(false);
            setData(response?.data);
        } else {
            setLoader(false);
            setData([]);
        }
    };

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"profit-loss-report"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"}`}
            >
                <Navbar pageName={"P/L Reports"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px]">
                    <PLReportsTable colors={colors} data={data} loader={loader} />
                </div>
            </div>
        </div>
    );
};

export default PLReports;
