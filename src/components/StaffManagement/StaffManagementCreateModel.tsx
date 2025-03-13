import { Modal } from 'antd';
import { FormEvent, useState } from 'react';

import Loader from '../Loader';
import toast from 'react-hot-toast';
import { createStaffApi } from '../../api/api';
import { FaIndianRupeeSign } from 'react-icons/fa6';

const StaffManagementCreateModel = ({ createStaff, setCreateStaff, fn_getStaffs }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wallet, setWallet] = useState("");
    const [loader, setLoader] = useState(false);
    const [validate, setValidate] = useState("");

    const fn_submit = async (e: FormEvent) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Enter Master Name")
        }
        if (email === "") {
            return toast.error("Enter Email Address")
        }
        if (validate === "") {
            return toast.error("Enter OTP for Master")
        }
        if (wallet === "") {
            return toast.error("Enter Wallet Amount");
        }
        if (password === "") {
            return toast.error("Enter Password");
        }
        const data = {
            email, password, wallet, name, validate
        }
        setLoader(true);
        const response = await createStaffApi(data);
        if (response?.status) {
            setLoader(false);
            setCreateStaff(false);
            setEmail("");
            setPassword("");
            fn_getStaffs();
            toast.success("Staff Added Successfully");
        } else {
            setLoader(false);
            toast.error(response?.message);
        }
    }

    return (
        <Modal
            title=""
            open={createStaff}
            onOk={() => setCreateStaff(!createStaff)}
            onCancel={() => setCreateStaff(!createStaff)}
            centered
            footer={null}
            style={{ fontFamily: "Roboto" }}
        >
            <p className='text-[22px] font-[600]'>Add New Master</p>
            <hr className='mt-[5px] mb-[10px]' />
            <form className='flex flex-col gap-[10px]' onSubmit={fn_submit}>
                <div className='flex flex-col gap-[5px]'>
                    <label className='font-[500] text-[15px]'>Name</label>
                    <input
                        value={name}
                        placeholder='Enter Master Name'
                        onChange={(e) => setName(e.target.value)}
                        className='h-[40px] border rounded-[7px] px-[10px] text-[14px] font-[500] focus:outline-none focus:border-gray-300'
                    />
                </div>
                <div className='flex flex-col gap-[5px]'>
                    <label className='font-[500] text-[15px]'>Email Address</label>
                    <input
                        value={email}
                        placeholder='Enter Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                        className='h-[40px] border rounded-[7px] px-[10px] text-[14px] font-[500] focus:outline-none focus:border-gray-300'
                    />
                </div>
                <div className='flex flex-col gap-[5px]'>
                    <label className='font-[500] text-[15px]'>OTP <span className='text-gray-600 text-[10px]'>(Max 6 digits Code)</span></label>
                    <input
                        type='number'
                        value={validate}
                        placeholder='Enter OTP for Master'
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 6) {
                                setValidate(value);
                            }
                        }}
                        className='h-[40px] border rounded-[7px] px-[10px] text-[14px] font-[500] focus:outline-none focus:border-gray-300'
                    />
                </div>
                <div className='flex flex-col gap-[5px] relative'>
                    <label className='font-[500] text-[15px]'>Wallet</label>
                    <input
                        step={0.01}
                        type='number'
                        value={wallet}
                        placeholder='Enter Wallet Amount'
                        onChange={(e) => setWallet(e.target.value)}
                        className='h-[40px] border rounded-[7px] py-[10px] ps-[25px] pe-[10px] text-[14px] font-[500] focus:outline-none focus:border-gray-300'
                    />
                    <FaIndianRupeeSign className='absolute bottom-[13px] left-[7px]' />
                </div>
                <div className='flex flex-col gap-[5px]'>
                    <label className='font-[500] text-[15px]'>Password</label>
                    <input
                        type='password'
                        value={password}
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='h-[40px] border rounded-[7px] px-[10px] text-[14px] font-[500] focus:outline-none focus:border-gray-300'
                    />
                </div>
                <button className='h-[40px] rounded-[7px] text-[15px] font-[500] bg-gray-600 text-white pt-[1px] my-[5px] flex justify-center items-center' disabled={loader}>
                    {!loader ? "Submit" : <Loader color='white' size={20} />}
                </button>
            </form>
        </Modal>
    )
}

export default StaffManagementCreateModel;