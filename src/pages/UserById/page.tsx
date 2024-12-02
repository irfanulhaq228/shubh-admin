import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";

import img from "../../assets/dummy_user.jpg";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import SingleUserTable from "../../components/Users/SingleUserTable";
import { useNavigate, useParams } from "react-router-dom";
import { fn_getUserInfoApi } from "../../api/api";
import { FaUserAlt } from "react-icons/fa";

const UserById = ({ darkTheme }: any) => {
    const navigate = useNavigate();
    const smallSidebar = useSelector((state: any) => state.smallSidebar);
    const dashboardDarkTheme = useSelector(
        (state: any) => state.dashboardDarkTheme
    );
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);
    const params: any = useParams();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        fn_getUserInfo();
        Aos.init({ once: true });
    }, []);

    const fn_getUserInfo = async () => {
        if (!params.id) return navigate("/users")
        const response = await fn_getUserInfoApi(params.id);
        if (response?.status) {
            setUser(response?.data?.data);
        }
    }

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"users"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
                    }`}
            >
                <Navbar pageName={"User Information"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px]">
                    {/* personal Information */}
                    <div className="rounded-[10px] sm:rounded-[15px] px-[10px] py-[30px] sm:p-[30px] flex flex-col sm:flex-row gap-[20px] md:gap-[70px] items-center" style={{ backgroundColor: colors.dark }}>
                        {/* <img alt="user-img" src={img} className="w-[150px] h-[150px] rounded-[15px]" /> */}
                        <FaUserAlt className="w-[130px] h-[130px]" />
                        <div className="flex flex-col ps-0 sm:ps-[20px] md:ps-[60px] sm:border-s" style={{ borderColor: colors.line }}>
                            <p className="text-[22px] sm:text-[27px] font-[600] mb-[10px] capitalize text-center sm:text-start" style={{ color: colors.text }}>{user?.username}</p>
                            {/* <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[54px] sm:gap-[68px]">
                                <span style={{ color: colors.subText }}>Age:</span>
                                <span style={{ color: colors.text }} className="font-[600]">34 Years</span>
                            </p>
                            <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[26px] sm:gap-[36px]">
                                <span style={{ color: colors.subText }}>Location:</span>
                                <span style={{ color: colors.text }} className="font-[600]">Mumbai, India</span>
                            </p> */}
                            <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                <span style={{ color: colors.subText }}>Contact No:</span>
                                <span style={{ color: colors.text }} className="font-[600]">{user?.phone}</span>
                            </p>
                            <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                <span style={{ color: colors.subText }}>Last Logged In Date:</span>
                                <span style={{ color: colors.text }} className="font-[600]">{new Date(user?.loginDetails?.[user?.loginDetails?.length-1]?.loginDateTime).toDateString()}, {new Date(user?.loginDetails?.[user?.loginDetails?.length-1]?.loginDateTime).toLocaleTimeString()}</span>
                            </p>
                            <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                <span style={{ color: colors.subText }}>Last Logged In Location:</span>
                                <span style={{ color: colors.text }} className="font-[600]">{user?.loginDetails?.[user?.loginDetails?.length-1]?.city}, {user?.loginDetails?.[user?.loginDetails?.length-1]?.state}, {user?.loginDetails?.[user?.loginDetails?.length-1]?.country}</span>
                            </p>
                        </div>
                    </div>
                    {/* bets Information */}
                    <div className="my-[20px] rounded-[10px] sm:rounded-[15px] px-[10px] py-[30px] sm:p-[30px]" style={{ backgroundColor: colors.dark }}>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Total Bets By User</p>
                            <p className="text-[20px] font-[600]" style={{ color: colors.text }}>{user?.totalBets}</p>
                        </div>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Running Bets</p>
                            <p className="text-[20px] font-[600]" style={{ color: colors.text }}>{user?.runningBets}</p>
                        </div>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>No. of Bets Wins</p>
                            <p className="text-[20px] font-[600]" style={{ color: colors.text }}>{user?.winBets}</p>
                        </div>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>No. of Bets Losses</p>
                            <p className="text-[20px] font-[600]" style={{ color: colors.text }}>{user?.lossBets}</p>
                        </div>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Winning Percentage</p>
                            <p className="text-[15px] text-white font-[500]">
                                <span className={`px-[12px] py-[5px] rounded-[6px] ${user?.mostResult === "win" ? "bg-[#59ca59]" : "bg-[#ff5d5d]"}`}>
                                    <TiArrowSortedDown className={`inline-block text-[18px] mt-[-2px] me-[4px] ${user?.mostResult === "win" ? "rotate-180" : "rotate-0"}`} />{parseFloat(user?.winPercentage).toFixed(2)}
                                </span>
                            </p>
                        </div>
                        <hr className="my-[20px]" />
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Total Deposit</p>
                            <p className="text-[20px] font-[600] flex items-center gap-[5px]" style={{ color: colors.text }}><FaIndianRupeeSign />{user.totalDeposit}</p>
                        </div>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Total Withdraw</p>
                            <p className="text-[20px] font-[600] flex items-center gap-[5px]" style={{ color: colors.text }}><FaIndianRupeeSign />{user.totalWithdraw}</p>
                        </div>
                        <div className="flex items-center h-[40px]">
                            <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Wallet Amount</p>
                            <p className="text-[20px] font-[600] flex items-center gap-[5px]" style={{ color: colors.text }}><FaIndianRupeeSign />{user?.wallet}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="mx-[10px] sm:mx-[20px] mb-[30px] bg-white">
                    <SingleUserTable colors={colors} />
                </div> */}
            </div>
        </div>
    );
};

export default UserById;
