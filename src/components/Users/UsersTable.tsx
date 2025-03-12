import { Switch } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import dummyUser from "../../assets/dummy_user.jpg";

import { MdDeleteForever } from "react-icons/md";
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FormEvent } from 'react';
import { deleteUserByIdApi, userStatusUpdateApi } from '../../api/api';
import { IoEye } from 'react-icons/io5';
import { FaExclamationCircle } from 'react-icons/fa';

const UsersTable = ({ colors, data, setData }: any) => {
    return (
        <>
            {/* table */}
            <div className="overflow-auto min-w-full">
                <table className="w-[950px] xl:w-full">
                    <thead>
                        <tr
                            className="leading-[40px] font-[600] text-[15px]"
                            style={{ color: colors.text, backgroundColor: colors.light }}
                        >
                            <td className="ps-[5px]">User Name</td>
                            <td>Phone</td>
                            {/* <td>Running Bets</td> */}
                            {/* <td>Total Deposit</td> */}
                            {/* <td>Total Withdraw</td> */}
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

const TableRows = ({ user, colors, win, image, link, setData, data }: any) => {
    const navigate = useNavigate();
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
    const handleDelete = async (e: FormEvent) => {
        e.stopPropagation();
        const response: any = await deleteUserByIdApi(user._id);
        if (response.status) {
            toast.success(response.message);
            const updatedData = data.filter((item: any) => item._id !== user._id);
            setData(updatedData);
        } else {
            toast.success(response.message)
        }
    }
    return (
        <tr
            key={user._id}
            className={`text-[13px] font-[500] border-b leading-[60px] cursor-pointer hover:bg-[#ffffffb0]`}
            style={{ borderColor: colors.line, color: colors.subText }}
            onClick={() => navigate(link)}
        >
            <td className="ps-[5px] flex items-center gap-[13px] capitalize">{user.username}</td>
            <td>{user?.phone}</td>
            {/* <td>5</td> */}
            {/* <td><FaIndianRupeeSign className='inline-block me-[4px]' />105000</td> */}
            <td><FaIndianRupeeSign className='inline-block me-[4px]' />{user.wallet}</td>
            <td>{user?.master?.type === "main" ? "Default Master" : user?.master?.name || "Master"}</td>
            {/* <td>
                <p className='text-white text-[13px] font-[500]'>
                    {!win ? (
                        <span className='bg-[#ff5d5d] px-[10px] py-[6px] rounded-[6px]'>
                            <TiArrowSortedDown className='inline-block text-[18px] mt-[-2px] me-[4px]' />40%
                        </span>
                    ) : (
                        <span className='bg-[#59ca59] px-[10px] py-[6px] rounded-[6px]'>
                            <TiArrowSortedUp className='inline-block text-[18px] mt-[-2px] me-[4px]' />55%
                        </span>
                    )}
                </p>
            </td> */}
            <td>
                <Switch size="small" defaultChecked={!user.disabled} title='disable' onClick={handleSwitchChange} />
                <MdDeleteForever
                    className='inline-block ms-[10px] text-[21px] text-red-600 cursor-pointer'
                    title='delete'
                    onClick={handleDelete}
                />
                <IoEye className='inline-block ms-[10px] text-[21px] cursor-pointer' />
            </td>
        </tr>
    );
};