import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import UsersTable from "../../components/Users/UsersTable";
import { getAllUsersApi } from "../../api/api";
import { IoSearchOutline } from "react-icons/io5";

const Users = ({ darkTheme }: any) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);

  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  const fn_getUser = async () => {
    const response = await getAllUsersApi();
    if (response?.status) {
      setData(response?.data);
      setAllData(response?.data);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    Aos.init({ once: true });
    fn_getUser();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setData(allData);
    } else {
      const filteredData = allData.filter((user: any) =>
        user?.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  }, [searchTerm, allData]);

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"users"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"Users"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div className="flex justify-end mb-[10px] relative">
            <input
              placeholder="Search by Name..."
              className="h-[35px] w-[300px] rounded-[5px] px-[15px] text-[14px] bg-white focus:outline-none border focus:border-gray-300"
              value={searchTerm}
              onChange={handleSearch}
            />
            <IoSearchOutline className="absolute top-[10px] right-[10px] text-gray-500" />
          </div>
          <UsersTable colors={colors} data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default Users;
