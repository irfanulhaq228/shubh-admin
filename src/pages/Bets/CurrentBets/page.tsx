import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpenBetsByAdminApi } from "../../../api/api";
import CurrentBetTable1 from "../../../components/Bets/CurrentBets/CurrentBetTable1";
import Loader from "../../../components/Loader";
import { updateBetsPage } from "../../../features/features";

// import CurrentBetTable2 from "../../../../components/account/Bets/CurrentBets/CurrentBetTable2";

const CurrentBets = ({ colors }: any) => {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [originalData, setOriginal] = useState([]);
  const [selectedSide, setSelectedSide] = useState("all");
  const panelSecColor = useSelector((state: any) => state.panelSecColor);

  const fn_getUserCurrentBets = async () => {
    const response = await getOpenBetsByAdminApi();
    if (response?.status) {
      setData(response?.data);
      setOriginal(response?.data);
    }
    setLoader(false);
  };

  useEffect(() => {
    dispatch(updateBetsPage("current-bets"))
    fn_getUserCurrentBets();
  }, []);

  const fn_applyFilter = async (value: string) => {
    if (value === selectedSide) return;
    setSelectedSide(value);
    if (value === "all") {
      setData(originalData);
    } else {
      const updatedData = originalData?.filter((item: any) => item?.side === value);
      setData(updatedData);
    }
  };

  return (
    <div className="mt-[30px]">
      {/* select options */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[30px]">
        <div className="flex items-center gap-[10px]">
          <label
            className="text-[14px] font-[500] w-[65px] sm:w-auto"
            style={{ color: colors.text }}
          >
            Side
          </label>
          <select
            className="w-[140px] h-[35px] rounded-[7px] shadow-sm font-[500] border text-[14px] px-[5px] focus:outline-none"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              borderColor: colors.text,
            }}
            onChange={(e) => fn_applyFilter(e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value={"Back"}>Back</option>
            <option value={"Lay"}>Lay</option>
          </select>
        </div>
      </div>
      {/* table-1 */}
      <div className="mt-[20px]">
        {!loader ? (
          <CurrentBetTable1 colors={colors} data={data} />
        ) : (
          <div className="flex justify-center w-full">
            <Loader size={30} color={panelSecColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBets;
