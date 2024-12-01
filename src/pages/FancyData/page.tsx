import { useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";

const FancyData = ({ darkTheme }: any) => {
    const smallSidebar = useSelector((state: any) => state.smallSidebar);

    const dashboardDarkTheme = useSelector(
        (state: any) => state.dashboardDarkTheme
    );
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"fancyData"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
                    }`}
            >
                <Navbar pageName={"Fancy Data"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px]"></div>
            </div>
        </div>
    );
};

export default FancyData;
