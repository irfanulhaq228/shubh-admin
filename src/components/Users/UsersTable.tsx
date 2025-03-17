import { Modal, Switch } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import dummyUser from "../../assets/dummy_user.jpg";

import { MdDeleteForever } from "react-icons/md";
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FormEvent, useState } from 'react';
import { deleteUserByIdApi, userStatusUpdateApi, userUpdateApi } from '../../api/api';
import { IoEye } from 'react-icons/io5';
import { FaExclamationCircle } from 'react-icons/fa';

const UsersTable = ({ colors, data, setData, fn_getUser }: any) => {
    return (
        <>
            {/* table */}
            <div className="overflow-auto min-w-full">
                <table className="w-[1300px] xl:w-full">
                    <thead>
                        <tr
                            className="leading-[40px] font-[600] text-[15px]"
                            style={{ color: colors.text, backgroundColor: colors.light }}
                        >
                            <td className="ps-[5px]">User Name</td>
                            <td>Phone</td>
                            <td>Wallet Amount</td>
                            <td>Master Name</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? data?.map((item: any) => (
                            <TableRows
                                user={item}
                                colors={colors}
                                win={false}
                                link={`/users/${item?._id}`}
                                image={<img alt='user-img' src={dummyUser} className='w-[50px] h-[50px] object-cover rounded-[5px]' />}
                                setData={setData}
                                data={data}
                                fn_getUser={fn_getUser}
                            />
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    <div className="flex justify-center items-center gap-[10px]" style={{ color: colors.subText }}>
                                        <FaExclamationCircle className="text-[16px]" />
                                        <span className="text-[14px] font-[500]">No Data Found</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTable;

const TableRows = ({ user, colors, link, setData, fn_getUser }: any) => {

    const navigate = useNavigate();
    const [points, setPoints] = useState("");
    const [password, setPassword] = useState("");
    const [givePointsModel, setGivePointsModel] = useState(false);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);

    const handleSwitchChange = async (checked: boolean, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        const id = user?._id;
        const response = await userStatusUpdateApi(!checked, id);
        if (response?.status) {
            toast.success(response?.message)
        } else {
            toast.error(response?.message)
        }
    };

    const fn_submit = async (e: FormEvent, value: any) => {
        e.preventDefault();
        if (value === "points") {
            if (points === "" || points === "0") {
                return toast.error("Enter Points");
            }
            const response = await userUpdateApi({ wallet: parseFloat(points) }, user._id);
            if (response?.status) {
                setGivePointsModel(false);
                setPoints("");
                fn_getUser();
                return toast.success(response?.message)
            } else {
                return toast.error(response?.message)
            }
        } else {
            if (password === "") {
                return toast.error("Enter Password");
            }
            const response = await userUpdateApi({ password: password }, user._id);
            if (response?.status) {
                setGivePointsModel(false);
                setResetPasswordModal(false);
                setPoints("");
                setPassword("");
                fn_getUser();
                return toast.success(response?.message)
            } else {
                return toast.error(response?.message)
            }
        }
    };

    return (
        <>
            <tr
                key={user._id}
                className={`text-[13px] font-[500] border-b leading-[60px] cursor-pointer hover:bg-[#ffffffb0]`}
                style={{ borderColor: colors.line, color: colors.subText }}
                onClick={() => navigate(link)}
            >
                <td className="ps-[5px] flex items-center gap-[13px] capitalize">{user.username}</td>
                <td>{user?.phone}</td>
                <td><FaIndianRupeeSign className='inline-block me-[4px]' />{user.wallet}</td>
                <td>{user?.master?.type === "main" ? "Default Master" : user?.master?.name || "Master"}</td>
                <td className='max-w-[100px]'>
                    <Switch size="small" defaultChecked={!user.disabled} title='disable' onClick={handleSwitchChange} />
                    <IoEye className='inline-block ms-[10px] text-[21px] cursor-pointer' />
                    <button
                        className='text-[11px] rounded-[5px] ms-[10px] px-[10px] h-[30px] leading-[32px]'
                        style={{ backgroundColor: colors.text, color: colors.bg }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setPoints("");
                            setGivePointsModel(!givePointsModel);
                        }}
                    >
                        Give Points
                    </button>
                    <button
                        className='text-[11px] rounded-[5px] ms-[10px] px-[10px] h-[30px] leading-[32px]'
                        style={{ backgroundColor: colors.text, color: colors.bg }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setPassword("");
                            setResetPasswordModal(!resetPasswordModal);
                        }}
                    >
                        Change Password
                    </button>
                </td>
            </tr>
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