import { MdDelete } from "react-icons/md";
import { deleteStaffApi, updateStaffApi } from "../../api/api";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FormEvent, useState } from "react";
import { Modal } from "antd";

const StaffManagementTable = ({ data, colors, fn_getStaffs }: any) => {
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
                            <td className="ps-[5px]">Sr No.</td>
                            <td>Master</td>
                            <td>Email Address</td>
                            <td>Wallet</td>
                            <td>OTP</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? data?.map((item: any, index: number) => (
                            <TableRows colors={colors} item={item} index={index + 1} fn_getStaffs={fn_getStaffs} />
                        )) : (
                            <tr>
                                <td colSpan={3} className="text-center pt-[10px] font-[500] text-[15px]">
                                    <FaExclamationCircle className="inline-block me-[7px] text-[20px] mt-[-2px]" />No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StaffManagementTable;

const TableRows = ({ colors, item, index, fn_getStaffs }: any) => {

    const [points, setPoints] = useState("");
    const [givePointsModel, setGivePointsModel] = useState(false);
    const fn_deleteStaff = async () => {
        const response = await deleteStaffApi(item?._id);
        if (response?.status) {
            toast.success("Staff Deleted");
            fn_getStaffs();
        }
    };
    const fn_submit = async (e: FormEvent) => {
        e.preventDefault();
        if (points === "" || points === "0") {
            return toast.error("Enter Points");
        }
        const response = await updateStaffApi(item._id, { wallet: parseInt(points) });
        if (response?.status) {
            setGivePointsModel(false);
            setPoints("");
            fn_getStaffs();
            return toast.success(response?.message)
        } else {
            return toast.error(response?.message)
        }
    };
    return (
        <>
            <tr
                className="text-[13px] font-[500] leading-[40px] border-b"
                style={{ borderColor: colors.line, color: colors.subText }}
            >
                <td className="ps-[5px]">{index}</td>
                <td className="capitalize">{item?.type === "main" ? "Default Master" : item?.name}</td>
                <td>{item?.email}</td>
                <td><FaIndianRupeeSign className="inline-block mt-[-1px]" /> {item?.wallet || 0}</td>
                <td>{item?.validate}</td>
                <td className="flex items-center gap-[10px] pt-[6px]">
                    <MdDelete className="text-red-500 text-[20px] cursor-pointer" onClick={fn_deleteStaff} />
                    <button
                        className='text-[11px] rounded-[5px] ms-[10px] px-[10px] h-[30px] leading-[32px]'
                        style={{ backgroundColor: colors.text, color: colors.bg }}
                        onClick={() => {
                            setPoints("");
                            setGivePointsModel(!givePointsModel);
                        }}
                    >
                        Give Points
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
                <p className="text-[22px] font-[700]">Give Points to Master</p>
                <form className="pb-[15px] pt-[20px] flex flex-col gap-[10px]" onSubmit={fn_submit}>
                    <div className="flex flex-col">
                        <p className="font-[500]">Enter Points</p>
                        <input
                            type='number'
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            placeholder="Add Points"
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
