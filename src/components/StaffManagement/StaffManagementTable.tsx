import { Modal, Switch } from "antd";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";

import { updateStaffApi } from "../../api/api";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaExclamationCircle, FaLock, FaLockOpen } from "react-icons/fa";

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
                            <td>Master Type</td>
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
    const [verified, setVerified] = useState(item?.verified);
    const [bets, setBets] = useState(item?.bets);

    const fn_toggleVerified = async (checked: boolean) => {
        const response = await updateStaffApi(item._id, { verified: checked });
        if (response?.status) {
            setVerified(checked);
            fn_getStaffs();
            toast.success("Master Updated");
        } else {
            toast.error("Failed to update verification status");
        }
    };

    const fn_toggleBets = async () => {
        const newBetsStatus = !bets;
        const response = await updateStaffApi(item._id, { bets: newBetsStatus });
        if (response?.status) {
            setBets(newBetsStatus);
            fn_getStaffs();
            toast.success("Bets status updated");
        } else {
            toast.error("Failed to update bets status");
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

    const fn_update = async () => {
        const response = await updateStaffApi(item._id, { type: "main" });
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
                <td className="capitalize">{item?.name}</td>
                <td>{item?.email}</td>
                <td><FaIndianRupeeSign className="inline-block mt-[-1px]" /> {item?.wallet || 0}</td>
                <td>{item?.validate}</td>
                <td>
                    {item?.type === "main" ? (
                        <p className="text-[11px] w-[90px] rounded-[100px] h-[28px] flex justify-center items-center cursor-not-allowed" style={{ backgroundColor: colors.dark, color: colors.text }}>Default Master</p>
                    ) : (
                        <p className="text-[11px] w-[90px] rounded-[100px] h-[28px] flex justify-center items-center cursor-pointer" onClick={fn_update} style={{ backgroundColor: colors.text, color: colors.bg }}>Set as Default</p>
                    )}
                </td>
                <td className="flex items-center gap-[10px] pt-[6px]">
                    <Switch checked={verified} onChange={fn_toggleVerified} size="small" />
                    {bets ? (
                        <FaLockOpen className="text-[16px] cursor-pointer" style={{ color: colors.text }} onClick={fn_toggleBets} />
                    ) : (
                        <FaLock className="text-[16px] cursor-pointer" style={{ color: colors.text }} onClick={fn_toggleBets} title="Bets Lock" />
                    )}
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
            </tr >
            {/* give points model */}
            < Modal
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
            </Modal >
        </>
    );
};
