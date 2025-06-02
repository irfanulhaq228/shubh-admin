import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";

import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { TbPercentage } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { fn_updateBonusApi } from "../../api/api";

const BonusStatementTable = ({ colors, data, joiningModal, closeBonusModal, setSelectedRow, setJoiningModal, selectedRow, fn_getBonus, refillModal, setRefillModal, olderModal, setOlderModal }: any) => {
  return (
    <>
      {/* table */}
      <div className="overflow-auto min-w-full">
        <table className="w-[1100px] xl:w-full">
          <thead>
            <tr
              className="leading-[40px] font-[600] text-[15px]"
              style={{ color: colors.text, backgroundColor: colors.light }}
            >
              <td className="ps-[5px] w-[100px]">Sr. No.</td>
              <td>Date</td>
              <td>Bonus Amount</td>
              <td>Bonus Type</td>
              <td>Master</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => (
              <TableRows index={index + 1} item={item} colors={colors} setSelectedRow={setSelectedRow} setJoiningModal={setJoiningModal} setRefillModal={setRefillModal} setOlderModal={setOlderModal} />
            ))}
          </tbody>
        </table>
      </div>
      <JoiningBonusUpdateModal colors={colors} joiningModal={joiningModal} closeBonusModal={closeBonusModal} selectedRow={selectedRow} fn_getBonus={fn_getBonus} />
      <RefillBonusModal colors={colors} refillModal={refillModal} closeBonusModal={closeBonusModal} selectedRow={selectedRow} />
      <OlderBonusModal colors={colors} olderModal={olderModal} closeBonusModal={closeBonusModal} selectedRow={selectedRow} fn_getBonus={fn_getBonus} />
    </>
  );
};

export default BonusStatementTable;

const TableRows = ({ index, item, colors, setSelectedRow, setJoiningModal, setRefillModal, setOlderModal }: any) => {

  const fn_eye = () => {
    if (item?.bonusType === "joining") {
      setSelectedRow(item);
      setJoiningModal(true);
    } else if (item?.bonusType === 'refill') {
      setSelectedRow(item);
      setRefillModal(true);
    } else {
      setSelectedRow(item);
      setOlderModal(true);
    }
  };

  return (
    <>
      <tr
        className="text-[13px] font-[500] leading-[34px] border-b"
        style={{ borderColor: colors.line, color: colors.subText }}
      >
        <td className="ps-[5px]">{index}</td>
        <td>{new Date(item?.createdAt).toDateString()}, {new Date(item?.createdAt).toLocaleTimeString()}</td>
        <td>{item?.bonusAmountType === "INR" && (<FaIndianRupeeSign className="inline-block mt-[-2px]" />)}{item?.amount || '-'}{item?.bonusAmountType === "percentage" && (<TbPercentage className="inline-block mt-[-2px]" />)}</td>
        <td>{item?.bonusType === "refill" && "Refill Bonus"}{item?.bonusType === "joining" && "Joining Bonus"}{item?.bonusType === "older" && "Older User Bonus"}</td>
        <td className="capitalize">{item?.master?.name}</td>
        <td className={`capitalize`}>
          {item?.status === 'active' && (
            <p className="text-green-600 bg-green-200 w-[80px] text-[11px] h-[25px] rounded-[25px] flex justify-center items-center">Active</p>
          )}
          {item?.status === 'completed' && (
            <p className="text-orange-600 bg-orange-200 w-[80px] text-[11px] h-[25px] rounded-[25px] flex justify-center items-center">Completed</p>
          )}
          {item?.status === 'pending' && (
            <p className="text-yellow-600 bg-yellow-200 w-[80px] text-[11px] h-[25px] rounded-[25px] flex justify-center items-center">Pending</p>
          )}
          {item?.status === 'stopped' && (
            <p className="text-gray-600 bg-gray-200 w-[80px] text-[11px] h-[25px] rounded-[25px] flex justify-center items-center">Stopped</p>
          )}
        </td>
        <td><IoEye className="text-[18px] cursor-pointer" style={{ color: colors.text }} onClick={fn_eye} /></td>
      </tr>
    </>
  );
};

const JoiningBonusUpdateModal = ({ colors, joiningModal, closeBonusModal, selectedRow, fn_getBonus }: any) => {

  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState(selectedRow?.amount || 0);
  const [type, setType] = useState('');

  useEffect(() => {
    if (joiningModal) {
      setAmount(selectedRow?.amount);
      setType(selectedRow?.bonusAmountType);
    };
  }, [joiningModal]);

  const fn_updateBonus = async () => {
    const response = await fn_updateBonusApi(selectedRow?._id, { status, amount, bonusAmountType: type });
    if (response?.status) {
      closeBonusModal();
      setStatus('');
      fn_getBonus();
      toast.success(response?.message);
    } else {
      toast.error(response?.message || "Network Error");
    }
  };

  return (
    <Modal
      title=""
      centered
      width={600}
      footer={null}
      open={joiningModal}
      onOk={() => { closeBonusModal(); setStatus('') }}
      onCancel={() => { closeBonusModal(); setStatus('') }}
      style={{ fontFamily: "Roboto" }}
    >
      <p className="text-[22px] font-[700]">Update Bonus</p>
      <div className="mt-[15px] flex flex-col gap-[10px]">
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Bonus Type</p>
          <p className="font-[500] text-[14px] flex-1">Joining Bonus</p>
        </div>
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Bonus Amount</p>
          <div className="flex justify-center gap-[15px] flex-1">
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" suffix={type === 'percentage' ? <FaPercent /> : <FaIndianRupeeSign />} className="flex-1" />
            <Select value={type} onChange={(e) => setType(e)} options={[{ label: 'Percentage', value: 'percentage' }, { label: 'INR', value: 'INR' }]} style={{ width: "150px" }} />
          </div>
        </div>
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Status</p>
          <div className="flex items-center gap-[15px]">
            {selectedRow?.status === "active" && (
              <p className="font-[500] flex-1 w-[70px] text-[12px] text-green-700 bg-green-200 h-[25px] rounded-[30px] flex justify-center items-center capitalize">{selectedRow?.status}</p>
            )}
            {selectedRow?.status === "stopped" && (
              <p className="font-[500] flex-1 w-[70px] text-[12px] text-red-700 bg-red-200 h-[25px] rounded-[30px] flex justify-center items-center capitalize pt-[1px]">{selectedRow?.status}</p>
            )}
            <Select
              value={status}
              className="w-[152px]"
              onChange={(e) => setStatus(e)}
              options={
                selectedRow?.status === 'active' ?
                  [{ label: 'Update Status', value: '', disabled: true }, { label: 'Stop', value: 'stopped', disabled: selectedRow?.status === 'stopped' }] :
                  [{ label: 'Update Status', value: '', disabled: true }, { label: 'Active', value: 'active', disabled: selectedRow?.status === 'active' }]
              }
            />
          </div>
        </div>
        <div className="flex justify-end gap-[15px] mt-[10px]">
          <button className="text-[14px] font-[500] w-[100px] rounded-[4px] h-[32px] border" style={{ color: colors?.text, backgroundColor: colors.bg, borderColor: colors?.text }} onClick={() => { closeBonusModal(); setStatus('') }}>
            Cancel
          </button>
          <button className="text-[14px] font-[500] w-[100px] rounded-[4px] h-[32px]" style={{ color: colors?.bg, backgroundColor: colors.text }} onClick={fn_updateBonus}>
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

const RefillBonusModal = ({ colors, refillModal, closeBonusModal, selectedRow }: any) => {

  return (
    <Modal
      title=""
      centered
      width={600}
      footer={null}
      open={refillModal}
      onOk={closeBonusModal}
      onCancel={closeBonusModal}
      style={{ fontFamily: "Roboto" }}
    >
      <p className="text-[22px] font-[700]">View Bonus Details</p>
      <div className="mt-[15px] flex flex-col gap-[10px]">
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Bonus Type</p>
          <p className="font-[500] text-[14px] flex-1">Refill Bonus</p>
        </div>
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Bonus Appied</p>
          <p className="font-[500] text-[14px] flex-1 capitalize">{selectedRow?.selectedUser?.username || "All"}</p>
        </div>
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Bonus Amount</p>
          <p className="font-[500] text-[14px] flex-1 capitalize"><FaIndianRupeeSign className="inline-block mt-[-2px] me-[3px]" />{selectedRow?.amount}</p>
        </div>
        <div className="flex justify-end gap-[15px] mt-[10px]">
          <button className="text-[14px] font-[500] w-[100px] rounded-[4px] h-[32px] border" style={{ color: colors?.text, backgroundColor: colors.bg, borderColor: colors?.text }} onClick={closeBonusModal}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const OlderBonusModal = ({ colors, olderModal, closeBonusModal, selectedRow, fn_getBonus }: any) => {
  const [status, setStatus] = useState('');
  const [updatedRow, setUpdatedRow] = useState<any>([]);
  const [newRow, setNewRow] = useState({ bets: '', bonus: '' });

  useEffect(() => {
    if (olderModal) {
      setNewRow({ bets: '', bonus: '' });
      setUpdatedRow(selectedRow?.olderBonusRows);
    }
  }, [olderModal]);

  const fn_updateBonus = async () => {
    if (newRow.bets && newRow.bonus) {
      updatedRow.push(newRow);
    }
    const response = await fn_updateBonusApi(selectedRow?._id, { status, olderBonusRows: updatedRow });
    if (response?.status) {
      closeBonusModal();
      setStatus('');
      fn_getBonus();
      toast.success(response?.message);
    } else {
      toast.error(response?.message || "Network Error");
    }
  };

  const fn_delRow = (id: any) => {
    const updatedData = updatedRow.filter((_: any, index: any) => index !== id);
    setUpdatedRow(updatedData);
  };

  const fn_addRow = () => {
    if (!newRow.bets || !newRow.bonus) {
      toast.error("Fields cannot be empty");
      return;
    }
    setUpdatedRow([...updatedRow, newRow]);
    setNewRow({ bets: '', bonus: '' });
  };

  return (
    <Modal
      title=""
      centered
      width={600}
      footer={null}
      open={olderModal}
      onOk={closeBonusModal}
      onCancel={closeBonusModal}
      style={{ fontFamily: "Roboto" }}
    >
      <p className="text-[22px] font-[700]">View Bonus Details</p>
      <div className="mt-[15px] flex flex-col gap-[10px]">
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Bonus Type</p>
          <p className="font-[500] text-[14px] flex-1">Older User Bonus</p>
        </div>
        {updatedRow?.map((i: any, idx: number) => (
          <div className="flex items-center w-full" key={idx}>
            <p className="w-[150px] text-[14px]">{i?.bets} Bets</p>
            <p className="font-[500] text-[14px] flex-1 max-w-[100px]">{i?.bonus}%</p>
            <p className="font-[500] text-[14px] flex-1">
              <MdDelete className="text-red-500 cursor-pointer" onClick={() => fn_delRow(idx)} />
            </p>
          </div>
        ))}
        <div className="flex items-center w-full">
          <Input
            placeholder="No. of Bets"
            value={newRow.bets}
            onChange={(e) => setNewRow({ ...newRow, bets: e.target.value })}
            className="w-[150px] me-[10px]"
          />
          <Input
            placeholder="Bet Amount (%)"
            value={newRow.bonus}
            onChange={(e) => setNewRow({ ...newRow, bonus: e.target.value })}
            className="w-[150px] me-[10px]"
          />
          <button
            className="text-[14px] font-[500] w-[32px] h-[32px] rounded-full bg-green-500 text-white flex justify-center items-center"
            onClick={fn_addRow}
          >
            +
          </button>
        </div>
        <div className="flex items-center w-full">
          <p className="w-[150px] text-[14px]">Status</p>
          {selectedRow?.status === "active" && (
            <p className="font-[500] flex-1 max-w-[70px] text-[12px] text-green-700 bg-green-200 h-[25px] rounded-[30px] flex justify-center items-center capitalize">{selectedRow?.status}</p>
          )}
          {selectedRow?.status === "stopped" && (
            <p className="font-[500] flex-1 max-w-[70px] text-[12px] text-red-700 bg-red-200 h-[25px] rounded-[30px] flex justify-center items-center capitalize pt-[1px]">{selectedRow?.status}</p>
          )}
          <Select
            value={status}
            className="w-[152px] ms-[10px]"
            onChange={(e) => setStatus(e)}
            options={
              selectedRow?.status === 'active' ?
                [{ label: 'Update Status', value: '', disabled: true }, { label: 'Stop', value: 'stopped', disabled: selectedRow?.status === 'stopped' }] :
                [{ label: 'Update Status', value: '', disabled: true }, { label: 'Active', value: 'active', disabled: selectedRow?.status === 'active' }]
            }
          />
        </div>
        <div className="flex justify-end gap-[15px] mt-[10px]">
          <button className="text-[14px] font-[500] w-[100px] rounded-[4px] h-[32px] border" style={{ color: colors?.text, backgroundColor: colors.bg, borderColor: colors?.text }} onClick={closeBonusModal}>
            Close
          </button>
          <button className="text-[14px] font-[500] w-[100px] rounded-[4px] h-[32px]" style={{ color: colors?.bg, backgroundColor: colors.text }} onClick={fn_updateBonus}>
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};
