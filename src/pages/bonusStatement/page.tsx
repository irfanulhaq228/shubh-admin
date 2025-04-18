import Aos from "aos";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaCalendarAlt } from "react-icons/fa";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import BonusStatementTable from "../../components/BonusStatement/BonusStatementTable";

const BonusStatement = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  const onChangeStart = (date: any, dateString: any) => {
    console.log(date, dateString, startDate);
    setStartDate(dateString);
  };
  const onChangeEnd = (date: any, dateString: any) => {
    console.log(date, dateString, endDate);
    setEndDate(dateString);
  };

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"bonusStatement"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[260px]"
        }`}
      >
        <Navbar
          pageName={"Bonus Statement"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div className="mb-[15px] flex gap-[15px] overflow-auto">
            <DatePicker
              onChange={onChangeStart}
              placeholder=""
              style={{
                backgroundColor: colors.light,
                border: "none",
                color: colors.text,
                fontWeight: "500",
                minWidth: "130px"
              }}
              suffixIcon={<FaCalendarAlt style={{ color: colors.text }} />}
            />
            <DatePicker
              onChange={onChangeEnd}
              placeholder=""
              style={{
                backgroundColor: colors.light,
                border: "none",
                color: colors.text,
                fontWeight: "500",
                minWidth: "130px"
              }}
              suffixIcon={<FaCalendarAlt style={{ color: colors.text }} />}
            />
            <button
              className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm pt-[1px] font-[500] text-[15px]"
              style={{
                backgroundColor: colors.text,
                color: colors.light,
              }}
            >
              Get Statement
            </button>
          </div>
          <div className="mb-[15px] flex gap-[15px] overflow-auto">
            <Button colors={colors} title={"Today"} />
            <Button colors={colors} title={"From Yesterday"} />
            <Button colors={colors} title={"Last 7 days"} />
            <Button colors={colors} title={"Last 30 days"} />
          </div>
          <div
            className="rounded-[15px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <BonusStatementTable colors={colors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusStatement;

const Button = ({ colors, title }: any) => {
  return (
    <button
      className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm font-[500] pt-[1px] text-[15px]"
      style={{
        backgroundColor: colors.light,
        color: colors.text,
      }}
    >
      {title}
    </button>
  );
};
