import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import Loader from "../../components/Loader";

const ReportsTable = ({ colors, data, loader }: any) => {
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
                            <td className="w-[300px]">Created At</td>
                            <td>Master</td>
                            <td>User</td>
                            <td>Amount Type</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loader ? (
                            <tr>
                                <td colSpan={6} className="text-center pt-[15px]">
                                    <Loader color={colors.text} size={20} />
                                </td>
                            </tr>
                        ) : data?.length > 0 ? data?.map((item: any, index: number) => (
                            <TableRows colors={colors} item={item} index={index + 1} />
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center pt-[10px] font-[500] text-[15px]">
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

export default ReportsTable;

const TableRows = ({ colors, item, index }: any) => {

    return (
        <>
            <tr
                className="text-[13px] font-[500] leading-[40px] border-b"
                style={{ borderColor: colors.line, color: colors.subText }}
            >
                <td className="ps-[5px]">{index}</td>
                <td>{new Date(item?.createdAt).toDateString()}, {new Date(item?.createdAt).toLocaleTimeString()}</td>
                <td className="capitalize">{item?.master?.name}</td>
                <td className="capitalize">{item?.user?.username}</td>
                <td className={`capitalize ${item?.accountType === "deposit" ? "text-green-600" : "text-blue-500"}`}>{item?.accountType}</td>
                <td><FaIndianRupeeSign className="inline-block mt-[-1px]" /> {item?.amount || 0}</td>
            </tr >
        </>
    );
};
