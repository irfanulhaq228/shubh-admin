import { formatDate } from "../../../api/api";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const BetHistoryTable = ({ colors, data }: any) => {
  return (
    <>
      {/* table */}
      <div className="overflow-auto min-w-full">
        <table className="w-[1250px] 2xl:w-full">
          <thead>
            <tr
              className="leading-[40px] font-[600] text-[15px]"
              style={{ color: colors.text, backgroundColor: colors.light }}
            >
              <td className="ps-[5px] w-[70px]">Sr No.</td>
              <td>Match Name</td>
              <td className="min-w-[100px]">Market Name</td>
              <td className="min-w-[100px] text-nowrap">User Name</td>
              <td className="min-w-[100px] text-nowrap">Master Name</td>
              <td className="min-w-[70px]">Side</td>
              <td className="min-w-[70px]">Stake</td>
              <td className="min-w-[70px]">Odd</td>
              <td className="min-w-[80px]">Profit/Loss</td>
              <td className="min-w-[100px]">Created Date</td>
              <td>Status</td>
              <td>IP Address</td>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? data?.map((item: any, index: number) => (
              <TableRows colors={colors} item={item} index={index + 1} />
            )) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BetHistoryTable;

const TableRows = ({ colors, item, index }: any) => {

  const removeNumberAtEnd = (text: string) => {
    return text.replace(/\s\d+$/, '');
  };

  return (
    <tr
      key={index}
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{index}</td>
      <td className="capitalize leading-[16px]">
        {removeNumberAtEnd(item?.gameName)} ({removeNumberAtEnd(item?.selectionName)})
      </td>
      <td className="capitalize leading-[16px]">{item?.marketName}</td>
      <td className="capitalize leading-[16px]">{item?.user?.username}</td>
      <td className="capitalize">
        {item?.master?.type === "main" ? "Default Master" : item?.master?.name || "Master"}
      </td>
      <td>{item?.side}</td>
      <td>
        <FaIndianRupeeSign className="inline-block me-[2px]" />
        {item?.stake}
      </td>
      <td>{item?.marketName === "fancy" ? item?.selectionName.match(/\d+(?!.*\d)/)?.[0] || item?.odd : item?.odd}</td>
      <td style={{ color: item?.status === "win" ? "green" : item?.status === "loss" ? "red" : "orange" }} >{item?.status === "win" ? `+${item?.profit}` : item?.status === "loss" ? `-${item?.loss}` : "Abandoned"}</td>
      <td>{formatDate(item?.createdAt)}</td>
      <td>
        {item?.status === "win" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#daf2d5] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[#2b872a] flex justify-center items-center">Win</p>}
        {item?.status === "pending" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#fff7cf] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[#b9ab25] flex justify-center items-center">Running</p>}
        {item?.status === "loss" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#ffd6d6] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[#fd3939] flex justify-center items-center">Loss</p>}
        {item?.status === "abandoned" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#f6e1b9] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[orange] flex justify-center items-center">Abandoned</p>}
      </td>
      <td>{item?.ipAddress}</td>
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
