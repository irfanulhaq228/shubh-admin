import { FaIndianRupeeSign } from "react-icons/fa6";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

import { formatDate } from "../../../api/api";

const CurrentBetTable1 = ({ colors, data }: any) => {
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
              <td className="min-w-[70px]">User Name</td>
              <td className="min-w-[70px]">Master Name</td>
              <td className="min-w-[70px]">Side</td>
              <td className="min-w-[70px]">Stake</td>
              <td className="min-w-[70px]">Odd</td>
              <td className="min-w-[70px]">Created Date</td>
              <td className="min-w-[70px]">IP Address</td>
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

export default CurrentBetTable1;

const TableRows = ({ colors, item, index }: any) => {

  const removeNumberAtEnd = (text: string) => {
    return text.replace(/\s\d+$/, '');
  };

  const getOddValue = (selectionName: string, odd: any) => {
    const match = selectionName.match(/\d+$/);
    return match ? match[0] : odd;
  };

  return (
    <tr
      key={index}
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{index}</td>
      <td className="capitalize">
        {removeNumberAtEnd(item?.gameName)} ({removeNumberAtEnd(item?.selectionName)})
      </td>
      <td className="capitalize">{item?.marketName}</td>
      <td className="capitalize">{item?.user?.username}</td>
      <td className="capitalize">
        {item?.master?.type === "main" ? "Default Master" : item?.master?.name || "Master"}
      </td>
      <td>{item?.side}</td>
      <td>
        <FaIndianRupeeSign className="inline-block me-[2px]" />
        {item?.stake}
      </td>
      <td>{item?.marketName === "fancy" ? item?.selectionName.match(/\d+(?!.*\d)/)?.[0] || item?.odd : item?.odd}</td>
      <td>{formatDate(item?.createdAt)}</td>
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
