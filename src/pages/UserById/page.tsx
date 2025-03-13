import Aos from "aos";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import { fn_getUserInfoApi, userUpdateApi } from "../../api/api";

import { MdLockReset } from "react-icons/md";
import { FaPlus, FaUserAlt } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import SingleUserTable from "../../components/Users/SingleUserTable";

const UserById = ({ darkTheme }: any) => {

    const navigate = useNavigate();
    const params: any = useParams();
    const [points, setPoints] = useState("");
    const [user, setUser] = useState<any>({});
    const [password, setPassword] = useState("");
    const [givePointsModel, setGivePointsModel] = useState(false);
    const colorScheme = useSelector((state: any) => state.colorScheme);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);
    const smallSidebar = useSelector((state: any) => state.smallSidebar);
    const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);

    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    useEffect(() => {
        fn_getUserInfo();
        Aos.init({ once: true });
    }, []);

    const fn_getUserInfo = async () => {
        if (!params.id) return navigate("/users");
        const response = await fn_getUserInfoApi(params.id);
        if (response?.status) {
            setUser(response?.data?.data);
        }
    };

    const fn_submit = async (e: FormEvent, value: any) => {
        e.preventDefault();
        if (value === "points") {
            if (points === "" || points === "0") {
                return toast.error("Enter Points");
            }
            const response = await userUpdateApi({ wallet: parseFloat(points) }, params.id);
            if (response?.status) {
                setGivePointsModel(false);
                setPoints("");
                fn_getUserInfo();
                return toast.success(response?.message)
            } else {
                return toast.error(response?.message)
            }
        } else {
            if (password === "") {
                return toast.error("Enter Password");
            }
            const response = await userUpdateApi({ password: password }, params.id);
            if (response?.status) {
                setGivePointsModel(false);
                setResetPasswordModal(false);
                setPoints("");
                setPassword("");
                fn_getUserInfo();
                return toast.success(response?.message)
            } else {
                return toast.error(response?.message)
            }
        }
    };

    return (
        <>
            <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
                <Sidebar colors={colors} path={"users"} />
                <div
                    className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
                        }`}
                >
                    <Navbar pageName={"User Information"} darkTheme={darkTheme} colors={colors} />
                    <div className="mt-[15px] px-[10px] sm:px-[20px]">
                        {/* personal Information */}
                        <div className="rounded-[10px] sm:rounded-[15px] px-[10px] py-[30px] sm:p-[30px] flex flex-col sm:flex-row gap-[20px] md:gap-[70px] items-center" style={{ backgroundColor: colors.dark }}>
                            {/* <img alt="user-img" src={img} className="w-[150px] h-[150px] rounded-[15px]" /> */}
                            <FaUserAlt className="w-[130px] h-[130px]" style={{ color: colors.subText }} />
                            <div className="flex flex-col ps-0 sm:ps-[20px] md:ps-[60px] sm:border-s" style={{ borderColor: colors.line }}>
                                <p className="text-[22px] sm:text-[27px] font-[600] mb-[10px] capitalize text-center sm:text-start" style={{ color: colors.text }}>{user?.username}</p>
                                <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                    <span style={{ color: colors.subText }}>Contact No:</span>
                                    <span style={{ color: colors.text }} className="font-[600]">{user?.phone}</span>
                                </p>
                                <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                    <span style={{ color: colors.subText }}>Last Logged In Date:</span>
                                    <span style={{ color: colors.text }} className="font-[600]">{new Date(user?.loginDetails?.[user?.loginDetails?.length - 1]?.loginDateTime).toDateString()}, {new Date(user?.loginDetails?.[user?.loginDetails?.length - 1]?.loginDateTime).toLocaleTimeString()}</span>
                                </p>
                                <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                    <span style={{ color: colors.subText }}>Last Logged In Location:</span>
                                    <span style={{ color: colors.text }} className="font-[600]">{user?.loginDetails?.[user?.loginDetails?.length - 1]?.city}, {user?.loginDetails?.[user?.loginDetails?.length - 1]?.state}, {user?.loginDetails?.[user?.loginDetails?.length - 1]?.country}</span>
                                </p>
                                <p className="text-[13px] sm:text-[15px] font-[500] flex items-center gap-[10px] sm:gap-[18px]">
                                    <span style={{ color: colors.subText }}>Master:</span>
                                    <span style={{ color: colors.text }} className="font-[600]">{user?.master?.type === "main" ? "Default Master" : user?.master?.name}</span>
                                </p>
                                <button className="w-[170px] mt-[15px] h-[35px] rounded-[5px] text-[14px] font-[500]" style={{ backgroundColor: colors.text, color: colors.bg }} onClick={() => setResetPasswordModal(!resetPasswordModal)}>
                                    <MdLockReset className="inline-block mr-1.5 mt-[-2px] text-[22px]" />Reset Password
                                </button>
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
                                <p className="text-[15px] font-[500] w-[300px]" style={{ color: colors.subText }}>Total Points</p>
                                <p className="text-[20px] font-[600] flex items-center gap-[5px]" style={{ color: colors.text }}><FaIndianRupeeSign />{user?.wallet?.toFixed(2)}</p>
                                <button className="rounded-[5px] h-[35px] w-[120px] text-[14px] font-[500] ms-[20px]" style={{ backgroundColor: colors.text, color: colors.bg }} onClick={() => { setPoints(""); setGivePointsModel(!givePointsModel); }}>
                                    <FaPlus className="inline-block mr-1.5 mt-[-3px]" />Add Points
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mx-[10px] sm:mx-[20px] mb-[30px] bg-white">
                    <SingleUserTable colors={colors} />
                </div> */}
                </div>
            </div>
            {/* give points model */}
            <Modal
                title=""
                open={givePointsModel}
                onOk={() => setGivePointsModel(!givePointsModel)}
                onCancel={() => setGivePointsModel(!givePointsModel)}
                centered
                footer={null}
                style={{ fontFamily: "Roboto" }}
                width={600}
            >
                <p className="text-[22px] font-[700]">Give Points to User</p>
                <form className="pb-[15px] pt-[20px] flex flex-col gap-[10px]" onSubmit={(e) => fn_submit(e, "points")}>
                    <div className="flex flex-col">
                        <p className="font-[500]">Enter Points</p>
                        <input
                            type='number'
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            className="w-full h-[40px] border rounded-[10px] px-[10px] font-[500] text-[15px] focus:outline-none focus:border-gray-400"
                        />
                    </div>
                    <button className="w-full rounded-[10px] mt-[18px] text-white flex justify-center items-center h-[40px] font-[500] text-[16px]" style={{ backgroundColor: colors.text }}>
                        Submit
                    </button>
                </form>
            </Modal>
            {/* password model */}
            <Modal
                title=""
                open={resetPasswordModal}
                onOk={() => setResetPasswordModal(!resetPasswordModal)}
                onCancel={() => setResetPasswordModal(!resetPasswordModal)}
                centered
                footer={null}
                style={{ fontFamily: "Roboto" }}
                width={600}
            >
                <p className="text-[22px] font-[700]">Reset Password of User</p>
                <form className="pb-[15px] pt-[20px] flex flex-col gap-[10px]" onSubmit={(e) => fn_submit(e, "password")}>
                    <div className="flex flex-col">
                        <p className="font-[500]">Enter New Password</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-[40px] border rounded-[10px] px-[10px] font-[500] text-[15px] focus:outline-none focus:border-gray-400"
                        />
                    </div>
                    <button className="w-full rounded-[10px] mt-[18px] text-white flex justify-center items-center h-[40px] font-[500] text-[16px]" style={{ backgroundColor: colors.text }}>
                        Submit
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default UserById;
