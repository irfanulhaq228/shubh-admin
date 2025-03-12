import { Modal } from "antd"
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import Loader from "../Loader";
import { UserSignUpApi } from "../../api/api";

import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UserAddModal = ({ open, setOpen, colors, fn_getUser }: any) => {

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [loader, setLoader] = useState(false);
    const [lengthError, setLengthError] = useState(true);
    const [characterError, setCharacterError] = useState(true);

    const fn_setPassword = (value: any) => {
        setPassword(value);
        if (value.length > 6) {
            setLengthError(false);
        } else {
            setLengthError(true);
        }
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacterRegex.test(value)) {
            setCharacterError(false);
        } else {
            setCharacterError(true);
        }
    }

    const fn_submit = async (e: any) => {
        e.preventDefault();
        if (phone.length < 5) {
            return toast.error("Write Correct Phone Number")
        }
        if (lengthError || characterError) {
            return toast.error("Write strong password");
        }
        setLoader(true);
        const phoneNumber = "+" + phone;
        const response = await UserSignUpApi({ username, phone: phoneNumber, password });
        if (response?.status) {
            fn_getUser();
            setPhone("");
            setOpen(false);
            setUsername("");
            setPassword("");
            setLoader(false);
            setLengthError(true);
            setCharacterError(true);
            setPasswordType("password");
            return toast.success(response?.message)
        } else {
            setLoader(false);
            return toast.error(response?.message)
        }
    };

    return (
        <Modal
            title=""
            centered
            open={open}
            footer={null}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            style={{ fontFamily: "Roboto" }}
        >
            <div className="flex justify-center font-[700] text-[25px] gap-[8px]">
                Add User
            </div>
            <form onSubmit={fn_submit} className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[3px]">
                    <label
                        htmlFor="username"
                        className="font-[500] text-[13px] sm:text-[16px]"
                    >
                        Username
                    </label>
                    <input
                        className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px]"
                        style={{ outlineColor: colors?.text }}
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-[3px]">
                    <label className="font-[500] text-[14px] sm:text-[16px]">
                        Phone Number
                    </label>
                    <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={(e: any) => setPhone(e)}
                        inputStyle={{
                            width: "100%",
                            borderColor: "#e5e7eb"
                        }}
                        inputProps={{
                            required: true,

                        }}
                    />
                </div>
                <div className="relative flex flex-col gap-[3px]">
                    <label
                        htmlFor="password"
                        className="font-[500] text-[14px] sm:text-[16px]"
                    >
                        Password
                    </label>
                    <input
                        type={passwordType}
                        className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px]"
                        style={{ outlineColor: colors?.text }}
                        id="password"
                        required
                        value={password}
                        onChange={(e) => fn_setPassword(e.target.value)}
                    />
                    {passwordType === "password" ? (
                        <FaRegEyeSlash
                            onClick={() => setPasswordType("text")}
                            className="cursor-pointer absolute right-[10px] bottom-[55px] sm:bottom-[37px]"
                        />
                    ) : (
                        <FaRegEye
                            onClick={() => setPasswordType("password")}
                            className="cursor-pointer absolute right-[10px] bottom-[55px] sm:bottom-[37px]"
                        />
                    )}
                    <div className="text-[13px] flex flex-col sm:flex-row sm:items-center sm:gap-[30px]">
                        <p className={`flex items-center ${lengthError ? "text-[red]" : "text-[green]"}`}>
                            {lengthError ? <RxCross2 className={`me-[5px]`} /> : <TiTick className={`me-[5px] scale-[1.2]`} />}
                            Length greater then 6 letter
                        </p>
                        <p className={`flex items-center ${characterError ? "text-[red]" : "text-[green]"}`}>
                            {characterError ? <RxCross2 className={`me-[5px]`} /> : <TiTick className={`me-[5px] scale-[1.2]`} />}
                            <span className="mt-[1px]">Use special character</span>
                        </p>
                    </div>
                </div>
                <button className={`relative h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px] flex justify-center items-center ${loader ? "cursor-not-allowed" : "cursor-pointer"}`} style={{ backgroundColor: colors.text, color: colors.bg }}>
                    {!loader ? "Signup" : <Loader color="var(--text-color)" size={20} />}
                </button>
            </form>
        </Modal>
    )
}

export default UserAddModal
