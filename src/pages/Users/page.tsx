import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import UsersTable from "../../components/Users/UsersTable";
import { getAllUsersApi } from "../../api/api";

const Users = ({ darkTheme }: any) => {
  const [data, setData] = useState([]);
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  const fn_getUser = async() => {
    const response = await getAllUsersApi();
    if(response?.status){
      setData(response?.data);
    }
  }

  useEffect(() => {
    Aos.init({ once: true });
    fn_getUser();
  }, []);

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"users"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
        }`}
      >
        <Navbar pageName={"Users"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
            <UsersTable colors={colors} data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default Users;
