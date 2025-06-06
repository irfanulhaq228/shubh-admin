import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import { adminLoginApi } from "../../api/api";
import { ModalOTP } from "../../components/ModalOTP";

// import img from "../../assets/login-bg.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { updateLoginType } from "../../features/features";
import UpdatePassword from "../../components/UpdatePassword";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState('admin');
    const [passwordType, setPasswordType] = useState("password");
    const [changePasswordModal, setChangePasswordModal] = useState(false);

    const [id, setId] = useState("");
    const [loader, setLoader] = useState(false);
    const [openOTP, setOpenOTP] = useState(false);

    const fn_toggleLoginType = (e: any, label: string) => {
        if (e.target.checked) {
            setLoginType(label);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (username === "") {
            return toast.error("Enter Username");
        }
        if (password === "") {
            return toast.error("Enter Password");
        }
        setLoader(true);

        const response: any = await adminLoginApi({ username, password, type: loginType });
        if (response.status) {
            if (loginType === "admin") {
                dispatch(updateLoginType(loginType));
                localStorage.setItem('loginType', loginType);
                localStorage.setItem('enableBanks', response?.enableBanks);
                setLoader(false);
                setId(response?.id);
                toast.success(response?.message);
                if (!response?.firstTime) {
                    return navigate("/dashboard");
                } else {
                    setId(response?.id);
                    setChangePasswordModal(true);
                }
                // return setOpenOTP(true);
            } else {
                setLoader(false);
                toast.success(response?.message);
                dispatch(updateLoginType('master'));
                localStorage.setItem('loginType', 'master');
                localStorage.setItem('enableBanks', response?.enableBanks);
                if (!response?.firstTime) {
                    return navigate("/dashboard");
                } else {
                    setId(response?.id);
                    setChangePasswordModal(true);
                }
            }
        } else {
            setLoader(false);
            return toast.error(response?.message);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-[100vh] p-[25px] relative bg-[--navy-light]">
                {/* <img src={img} alt="bg" className="fixed w-full min-h-[100vh] opacity-30" /> */}
                <div className="relative w-[400px] rounded-[10px] z-[999] bg-opacity-50 bg-[rgba(255,255,255,0.3)] backdrop-blur-md border border-gray-300 shadow-lg">
                    <p className="text-center bg-[rgba(255,255,255,0.5)] rounded-t-[10px] py-[10px] text-[30px] font-[600] border-b border-gray-300">Login</p>

                    <div className="flex gap-[30px] px-[30px] mt-[30px]">
                        <div className="flex items-center gap-[5px] text-[14px] cursor-pointer">
                            <input type="radio" className="cursor-pointer" defaultChecked id="adminInput" name="loginType" onChange={(e) => fn_toggleLoginType(e, 'admin')} />
                            <label htmlFor="adminInput" className="cursor-pointer">Login As Admin</label>
                        </div>
                        <div className="flex items-center gap-[5px] text-[14px] cursor-pointer">
                            <input type="radio" className="cursor-pointer" id="staffInput" name="loginType" onChange={(e) => fn_toggleLoginType(e, 'staff')} />
                            <label htmlFor="staffInput" className="cursor-pointer">Login As Master</label>
                        </div>
                    </div>

                    <form className="p-[35px] flex flex-col gap-[25px]" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <p className="text-[14px] font-[500]">Username</p>
                            <input
                                className="h-[35px] border-b border-gray-300 focus:border-gray-400 bg-transparent focus:outline-none text-[14px] font-[500] text-gray-700"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col relative">
                            <p className="text-[14px] font-[500]">Password</p>
                            <input
                                type={passwordType}
                                className="h-[35px] border-b border-gray-300 focus:border-gray-400 bg-transparent focus:outline-none text-[14px] font-[500] text-gray-700"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordType === "password" && <FaRegEyeSlash className="absolute right-[5px] top-[30px] cursor-pointer" onClick={() => setPasswordType("text")} />}
                            {passwordType === "text" && <FaRegEye className="absolute right-[5px] top-[30px] cursor-pointer" onClick={() => setPasswordType("password")} />}
                        </div>
                        <button type="submit" className="h-[40px] bg-[rgba(255,255,255,0.5)] border border-gray-300 rounded-full text-[14px] font-[500] mt-[10px] flex items-center justify-center" disabled={loader}>
                            {!loader ? "Login" : <Loader color="black" size={20} />}
                        </button>
                    </form>
                </div>
            </div>
            <ModalOTP openOTP={openOTP} setOpenOTP={setOpenOTP} id={id} />
            <UpdatePassword open={changePasswordModal} setOpen={setChangePasswordModal} id={id} navigate={navigate} />
        </>
    )
};

export default Login