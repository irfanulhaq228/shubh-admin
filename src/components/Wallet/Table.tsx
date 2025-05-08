import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";

const WalletTable = ({ colors, data }: any) => {
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
              <td className="w-[150px] ps-[5px]">Sr #</td>
              <td>Creation Date</td>
              <td className="w-[250px]">Amount</td>
              <td className="w-[200px]">Status</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: any) => (
              <TableRows item={item} index={index + 1} colors={colors} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WalletTable;

const TableRows = ({ item, index, colors }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{index}</td>
      <td>{new Date(item?.createdAt).toDateString()}, {new Date(item?.createdAt).toLocaleTimeString()}</td>
      <td><FaIndianRupeeSign className="inline-block mt-[-2px]" /> {item?.amount}</td>
      <td>
        <p
          className={`px-4 py-1 rounded-full text-xs font-medium w-[max-content] capitalize min-w-[80px] text-center 
      ${item?.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
      ${item?.status === 'decline' ? 'bg-red-100 text-red-700' : ''}
      ${item?.status === 'approved' ? 'bg-green-100 text-green-700' : ''}
    `}
        >
          {item?.status}
        </p>
      </td>
    </tr>
  );
};
