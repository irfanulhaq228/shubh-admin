import { MdDelete } from "react-icons/md";
import { deleteStaffApi } from "../../api/api";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";

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
                            <td>Email Address</td>
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
    const fn_deleteStaff = async () => {
        const response = await deleteStaffApi(item?._id);
        if (response?.status) {
            toast.success("Staff Deleted");
            fn_getStaffs();
        }
    }
    return (
        <tr
            className="text-[13px] font-[500] leading-[34px] border-b"
            style={{ borderColor: colors.line, color: colors.subText }}
        >
            <td className="ps-[5px]">{index}</td>
            <td>{item?.email}</td>
            <td><MdDelete className="text-red-500 text-[20px] cursor-pointer" onClick={fn_deleteStaff} /></td>
        </tr>
    );
};
