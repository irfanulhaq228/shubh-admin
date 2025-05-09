import { formatDate } from "../../../api/api";

import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const ProfitLossTable = ({ colors, data }: any) => {
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
                            <td className="ps-[5px] w-[100px]">Sr No.<SortingArrows /></td>
                            <td className="min-w-[250px]">Match Name</td>
                            <td>Start Time</td>
                            <td>Commision<SortingArrows /></td>
                            <td>PL</td>
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

export default ProfitLossTable;

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
            <td className="capitalize">{item?.gameName} ({removeNumberAtEnd(item?.selectionName)})</td>
            <td>{formatDate(item?.createdAt)}</td>
            <td>{item?.profit}</td>
            <td style={{ color: item?.status === "pending" ? "black" : item?.status === "win" ? "green" : "red" }}>{item?.status === "pending" ? "Continue" : item?.status === "win" ? `+${item?.profit}` : `-${item?.loss}`}</td>
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
