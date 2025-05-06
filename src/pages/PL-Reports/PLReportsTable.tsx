import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import Loader from "../../components/Loader";

const PLReportsTable = ({ colors, data, loader }: any) => {
    const totalProfit = data?.reduce((sum: number, item: any) => sum + (item?.totalProfit || 0), 0);

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
                            <td className="w-[300px]">Event Name</td>
                            <td>Bets</td>
                            <td>P/L</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loader ? (
                            <tr>
                                <td colSpan={4} className="text-center pt-[15px]">
                                    <Loader color={colors.text} size={20} />
                                </td>
                            </tr>
                        ) : data?.length > 0 ? (
                            <>
                                {data?.map((item: any, index: number) => (
                                    <PLTableRows colors={colors} item={item} index={index + 1} />
                                ))}
                                <tr
                                    className="leading-[40px] border-b"
                                    style={{ borderColor: colors.line }}
                                >
                                    <td colSpan={3}></td>
                                    <td className="font-[700] text-[15px]" style={{ color: colors.text }}>
                                        <span className="inline-block me-[7px]">Total:</span>
                                        <span className={`inline-block ${totalProfit > 0 ? "text-green-600" : "text-red-500"}`}>
                                            <FaIndianRupeeSign className="inline-block mt-[-1px]" /> {totalProfit}
                                        </span>
                                    </td>
                                </tr>
                            </>
                        ) : (
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

export default PLReportsTable;

const PLTableRows = ({ colors, item, index }: any) => {

    return (
        <>
            <tr
                className="text-[13px] font-[500] leading-[40px] border-b"
                style={{ borderColor: colors.line, color: colors.subText }}
            >
                <td className="ps-[5px] w-[100px]">{index}</td>
                <td className="capitalize">{item?.gameName}</td>
                <td className="w-[200px]">{item?.totalBets}</td>
                <td className={`capitalize ${item?.totalProfit > 0 ? "text-green-600" : "text-red-500"} w-[200px]`}><FaIndianRupeeSign className="inline-block mt-[-1px]" /> {item?.totalProfit}</td>
            </tr >
        </>
    );
};
