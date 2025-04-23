import React, { FormEvent, useState } from 'react';
import { Modal } from 'antd'
import { updatePasswordApi } from '../api/api';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const UpdatePassword = ({ id, open, navigate }: any) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    const fn_update = async (e: FormEvent) => {
        e.preventDefault();
        if (password === "") {
            return toast.error("Enter Password");
        }
        if (password !== confirmPassword) {
            return toast.error("Password and Confirm Password do not match");
        }
        const response = await updatePasswordApi(id, { password }) as any;
        if (response.status) {
            setPassword("");
            toast.success(response.message);
            return navigate("/dashboard");
        } else {
            return toast.error(response.message || "Something went wrong");
        }
    };

    return (
        <Modal
            title=""
            centered
            open={open}
            width={450}
            footer={null}
            closeIcon={null}
            style={{ fontFamily: "Roboto" }}
        >
            <p className='text-[18px] font-[500] mt-[-5px]'>Update Your Password</p>
            <hr className='my-[10px]' />
            <form className='mb-[10px]' onSubmit={fn_update}>
                <div className='flex flex-col mt-[15px]'>

                    <div className='relative'>
                        <p className='text-[14px] font-[500] mb-[-8px]'>Enter New Password</p>
                        <input type={passwordType} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[40px] bg-gray-100 mt-[10px] mb-[10px] border border-gray-300 rounded-[5px] text-[14px] font-[500] px-[10px]" />
                        {passwordType === "text" && <FaRegEye className='absolute right-[10px] bottom-[22px] cursor-pointer' onClick={() => setPasswordType("password")} />}
                        {passwordType === "password" && <FaRegEyeSlash className='absolute right-[10px] bottom-[22px] cursor-pointer' onClick={() => setPasswordType("text")} />}
                    </div>

                    <div className='relative'>
                        <p className='text-[14px] font-[500] mb-[-8px]'>Confirm New Password</p>
                        <input type={confirmPasswordType} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-[40px] bg-gray-100 mt-[10px] mb-[10px] border border-gray-300 rounded-[5px] text-[14px] font-[500] px-[10px]" />
                        {confirmPasswordType === "text" && <FaRegEye className='absolute right-[10px] bottom-[22px] cursor-pointer' onClick={() => setConfirmPasswordType("password")} />}
                        {confirmPasswordType === "password" && <FaRegEyeSlash className='absolute right-[10px] bottom-[22px] cursor-pointer' onClick={() => setConfirmPasswordType("text")} />}
                    </div>

                    <button type='submit' className='h-[40px] w-full rounded-full bg-gray-300 mt-[15px] font-[500] text-[15px]'>Update</button>
                </div>
            </form>
        </Modal>
    )
}

export default UpdatePassword