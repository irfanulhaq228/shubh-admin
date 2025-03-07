import Aos from "aos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../../components/navbar";
import { getAllUsersApi } from "../../api/api";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import UsersTable from "../../components/Users/UsersTable";
import UserAddModal from "../../components/Users/UserAddModal";

import { IoSearchOutline } from "react-icons/io5";

const Users = ({ darkTheme }: any) => {

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loginType = localStorage.getItem('loginType');
  const [userAddModal, setUserAddModal] = useState(false);
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
    if (!userAddModal) {
      fn_getUser();
    }
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
      <UserAddModal open={userAddModal} setOpen={setUserAddModal} colors={colors} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"Users"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div className="flex items-center justify-end gap-[10px] mb-[15px]">
            <div className="relative">
              <input
                placeholder="Search by Name..."
                className="h-[35px] w-[300px] rounded-[5px] px-[15px] text-[14px] bg-white focus:outline-none border focus:border-gray-300"
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoSearchOutline className="absolute top-[10px] right-[10px] text-gray-500" />
            </div>
            {loginType !== "admin" && (
              <button
                type="button"
                className={`h-[35px] rounded-[5px] w-[130px] text-[14px] font-[500] flex items-center justify-center gap-[5px] pt-[1px] transform scale-100 active:scale-95 transition-transform duration-200 will-change-transform`}
                style={{ backgroundColor: colors.text, color: colors.bg }}
                onClick={() => setUserAddModal(!userAddModal)}
              >
                <span className="text-[18px]">+</span>Add User
              </button>
            )}
          </div>
          <UsersTable colors={colors} data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default Users;
