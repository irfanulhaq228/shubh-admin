import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import URL, { formatDate, getDepositApi, updateDepositApi } from "../../api/api";
import { Modal } from 'antd';
import toast from "react-hot-toast";
import Loader from "../Loader";
import OTPInput from "react-otp-input";

const DepositTable = ({ colors }: any) => {
    const [otp, setOtp] = useState("");
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [correctOTP, setCorrectOTP] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({});

    const [validateModal, setValidateModal] = useState(false);

    useEffect(() => {
        fn_getDeposit();
    }, [])

    const fn_getDeposit = async () => {
        const response = await getDepositApi();
        if (response?.status) {
            setLoader(false);
            setData(response?.data?.reverse());
            if(response?.data?.length !== 0) {
                setCorrectOTP(response?.data?.[0]?.master?.validate)
            }
        } else {
            setLoader(false);
            setData([]);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem({});
    };

    const fn_updateStatus = async (value: string, id: string) => {
        if (otp !== correctOTP) {
            return toast.error("Incorrect OTP", { style: {zIndex: 9999999999} });
        }
        const response = await updateDepositApi(id, value);
        if (response?.status) {
            setSelectedItem({});
            setIsModalOpen(false);
            fn_getDeposit();
            return toast.success(response?.message);
        } else {
            return toast.error(response?.message);
        }
    };

    const handleStatusChange = (value: string, id: string) => {
        setValidateModal(true);
        setSelectedItem({ ...selectedItem, statusToUpdate: value, idToUpdate: id });
    };

    return (
        <>
            {/* table */}
            <div className="overflow-auto min-w-full">
                <table className="w-[1000px] xl:w-full">
                    <thead>
                        <tr
                            className="leading-[55px] font-[600] text-[15px]"
                            style={{ color: colors.text, backgroundColor: colors.light }}
                        >
                            <td className="ps-[5px]">Sr No.</td>
                            <td>TRN-ID</td>
                            <td>USERNAME</td>
                            <td>BANK NAME</td>
                            <td>MASTER NAME</td>
                            <td>DATE</td>
                            <td>AMOUNT<SortingArrows /></td>
                            <td>Status</td>
                            <td>View</td>
                        </tr>
                    </thead>
                    <tbody>
                        {!loader ? data?.map((item, index) => (
                            <TableRows item={item} index={index + 1} colors={colors} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setSelectedItem={setSelectedItem} />
                        )) : (
                            <tr>
                                <td colSpan={8} className="text-center h-[40px] pt-[10px]"><Loader size={25} color={"#3d3d9e"} /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* modal */}
            <Modal
                title=""
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                onClose={closeModal}
                style={{ fontFamily: "Roboto" }}
                centered
                width={900}
                footer={null}
            >
                <p className="text-[25px] font-[700]">Deposited Transaction Details</p>
                <div className="my-[20px] flex gap-[30px]">
                    <div className="max-w-[400px]">
                        <img alt="" src={`${URL}/${selectedItem?.receipt}`} className="max-h-[550px] lg:min-w-[300px] object-contain" />
                    </div>
                    <div className="flex-1 max-w-[400px] flex flex-col gap-[20px]">
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Transaction Id</p>
                            <p className="text-[19px] font-[600]">{selectedItem?.transactionId}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">User Name</p>
                            <p className="text-[19px] font-[600]">{selectedItem?.user?.username}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Bank Name</p>
                            <p className="text-[19px] font-[600]">{selectedItem?.bank?.bank}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Transaction Time</p>
                            <p className="text-[19px] font-[600]">{formatDate(selectedItem?.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Transaction Amount</p>
                            <p className="text-[22px] font-[600]"><FaIndianRupeeSign className="inline-block" />{selectedItem?.amount}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Status</p>
                            <p className="text-[22px] font-[600] mt-[5px]">
                                {selectedItem?.status === "approved" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#daf2d5] h-[35px] rounded-full w-[100px] text-[14px] font-[600] text-[#2b872a] flex justify-center items-center">Approved</p>}
                                {selectedItem?.status === "pending" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#fff7cf] h-[35px] rounded-full w-[100px] text-[14px] font-[600] text-[#b9ab25] flex justify-center items-center">Pending</p>}
                                {selectedItem?.status === "decline" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#ffd6d6] h-[35px] rounded-full w-[100px] text-[14px] font-[600] text-[#fd3939] flex justify-center items-center">Decline</p>}
                            </p>
                        </div>
                        {selectedItem?.status === "pending" && (
                            <div className="flex flex-col sm:flex-row gap-[10px] mt-[10px]">
                                {selectedItem?.status !== "pending" && <button disabled={selectedItem?.status === "approved" || selectedItem?.status === "decline"} className={`h-[40px] w-[120px] rounded-[10px] bg-yellow-400 font-[600] ${(selectedItem?.status === "approved" || selectedItem?.status === "decline") && "cursor-not-allowed"}`} onClick={() => handleStatusChange("pending", selectedItem?._id)}>Pending</button>}
                                {selectedItem?.status !== "approved" && <button disabled={selectedItem?.status === "approved" || selectedItem?.status === "decline"} className={`h-[40px] w-[120px] rounded-[10px] bg-green-400 font-[600] ${(selectedItem?.status === "approved" || selectedItem?.status === "decline") && "cursor-not-allowed"}`} onClick={() => handleStatusChange("approved", selectedItem?._id)}>Approved</button>}
                                {selectedItem?.status !== "decline" && <button disabled={selectedItem?.status === "approved" || selectedItem?.status === "decline"} className={`h-[40px] w-[120px] rounded-[10px] bg-red-400 font-[600] ${(selectedItem?.status === "approved" || selectedItem?.status === "decline") && "cursor-not-allowed"}`} onClick={() => handleStatusChange("decline", selectedItem?._id)}>Decline</button>}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
            {/* check validation modal */}
            <Modal
                title=""
                open={validateModal}
                onOk={() => setValidateModal(false)}
                onCancel={() => setValidateModal(false)}
                onClose={() => setValidateModal(false)}
                style={{ fontFamily: "Roboto" }}
                centered
                width={500}
                footer={null}
                zIndex={9999}
            >
                <div>
                    <p className="text-[20px] font-[600]">Enter OTP for Validate Yourself</p>
                    <div className="flex flex-col items-center justify-center w-full mb-[30px] mt-[40px] gap-[20px]">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className='mx-[5px]'></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{ width: "45px", height: "45px", border: "1px solid gray", fontSize: "16px", fontWeight: "600", borderRadius: "8px" }}
                        />
                        <button
                            className="h-[35px] font-[500] text-[14px] w-full rounded-[5px] max-w-[320px]"
                            style={{ backgroundColor: colors.text, color: colors.bg }}
                            onClick={() => {
                                if (otp === correctOTP) {
                                    fn_updateStatus(selectedItem.statusToUpdate, selectedItem.idToUpdate);
                                    setValidateModal(false);
                                } else {
                                    toast.error("Incorrect OTP");
                                }
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DepositTable;

const TableRows = ({ colors, item, index, isModalOpen, setIsModalOpen, setSelectedItem }: any) => {
    return (
        <tr
            className="text-[13px] font-[500] leading-[50px] border-b"
            style={{ borderColor: colors.line, color: colors.subText }}
        >
            <td className="ps-[5px]">{index}</td>
            <td className="ps-[5px]">{item?.transactionId}</td>
            <td className="ps-[5px]">{item?.user?.username}</td>
            <td>{item?.bank?.bank}</td>
            <td>{item?.master?.type === "main" ? "Default Master" : item?.master?.name || "Master"}</td>
            <td>{formatDate(item?.createdAt)}</td>
            <td><FaIndianRupeeSign className="inline-block" />{item?.amount}</td>
            <td>
                {item?.status === "approved" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#daf2d5] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#2b872a] flex justify-center items-center">Approved</p>}
                {item?.status === "pending" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#fff7cf] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#b9ab25] flex justify-center items-center">Pending</p>}
                {item?.status === "decline" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#ffd6d6] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#fd3939] flex justify-center items-center">Decline</p>}
            </td>
            <td>
                <p
                    className="w-[30px] h-[30px] flex justify-center items-center bg-[#d4eaff] rounded-full cursor-pointer"
                    onClick={() => {
                        setIsModalOpen(!isModalOpen);
                        setSelectedItem(item)
                    }}
                >
                    <FiEye className="text-[#3e64a7]" />
                </p>
            </td>
        </tr>
    );
};

const SortingArrows = () => {
    return (
        <div className="inline-block ms-[10px] mb-[-4px]">
            <BiSolidUpArrow className="h-[9px] cursor-pointer" />
            <BiSolidDownArrow className="h-[9px] cursor-pointer" />
        </div>
    )
}
