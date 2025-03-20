import React, { FormEvent, useState } from 'react';
import { Modal } from 'antd'
import { updatePasswordApi } from '../api/api';
import toast from 'react-hot-toast';

const UpdatePassword = ({ id, open, navigate }: any) => {

    const [password, setPassword] = useState("");

    const fn_update = async (e: FormEvent) => {
        e.preventDefault();
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
                    <p className='text-[14px] font-[500] mb-[-8px]'>Enter New Password</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[40px] bg-gray-100 mt-[10px] mb-[10px] border border-gray-300 rounded-[5px] text-[14px] font-[500] px-[10px]" />
                    <button type='submit' className='h-[40px] w-full rounded-full bg-gray-300 mt-[15px] font-[500] text-[15px]'>Update</button>
                </div>
            </form>
        </Modal>
    )
}

export default UpdatePassword