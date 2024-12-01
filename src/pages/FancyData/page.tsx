import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import useColorScheme from "../../hooks/useColorScheme";
import { getEventsRunFancyDataApi, getFancyDataByEventIdApi, updateFancyResultApi } from "../../api/api";

const FancyData = ({ darkTheme }: any) => {
    const [fancyData, setFancyData] = useState([]);
    const [eventsData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState<any>({});
    const smallSidebar = useSelector((state: any) => state.smallSidebar);

    const dashboardDarkTheme = useSelector(
        (state: any) => state.dashboardDarkTheme
    );

    const colorScheme = useSelector((state: any) => state.colorScheme);
    const colors = useColorScheme(dashboardDarkTheme, colorScheme);

    const fn_getEventsRunFancyData = async () => {
        const response = await getEventsRunFancyDataApi();
        if (response?.status) {
            setEventData(response?.data);
            setSelectedEvent(response?.data?.[0]);
        }
    }

    const fnInterval_getEventsRunFancyData = async () => {
        const response = await getEventsRunFancyDataApi();
        if (response?.status) {
            setEventData(response?.data);
        }
    }

    const fn_getFancyDataByEventId = async (eventId: string) => {
        const response = await getFancyDataByEventIdApi(eventId);
        if (response?.status) {
            setFancyData(response?.data);
        }
    }

    useEffect(() => {
        fn_getEventsRunFancyData();
        const eventInterval = setInterval(fnInterval_getEventsRunFancyData, 10000);

        return () => {
            clearInterval(eventInterval);
        };
    }, []);

    useEffect(() => {
        if (Object.keys(selectedEvent)?.length > 0) {
            fn_getFancyDataByEventId(selectedEvent?.eventId);
            const fancyDataInterval = setInterval(() => {
                fn_getFancyDataByEventId(selectedEvent?.eventId);
            }, 5000);

            return () => {
                clearInterval(fancyDataInterval);
            };
        }
    }, [selectedEvent]);

    return (
        <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
            <Sidebar colors={colors} path={"fancyData"} />
            <div
                className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
                    }`}
            >
                <Navbar pageName={"Fancy Data"} darkTheme={darkTheme} colors={colors} />
                <div className="mt-[15px] px-[10px] sm:px-[20px] pb-[30px]">
                    <p className="text-[20px] font-[500]">Matches in which Fancy's Run</p>
                    <div className="mt-[5px] flex gap-[15px] overflow-x-auto">
                        {eventsData?.length > 0 && eventsData?.map((item) => (
                            <Button colors={colors} item={item} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
                        ))}
                    </div>
                    <div className="mt-[15px] flex flex-col gap-[10px]">
                        {fancyData?.length > 0 ? fancyData?.map((item) => (
                            <FancyBox colors={colors} item={item} selectedEvent={selectedEvent} />
                        )) : (
                            <p className="text-center font-[500]">No Fancy Data Found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FancyData;

const Button = ({ colors, item, selectedEvent, setSelectedEvent }: any) => {
    return (
        <button
            key={item?.eventId}
            onClick={() => setSelectedEvent(item)}
            className={`min-w-[max-content] text-nowrap text-[15px] font-[500] h-[40px] rounded-[7px] max-w-[max-content] px-[20px] flex justify-center items-center`}
            style={selectedEvent?.eventId === item?.eventId ? { backgroundColor: colors.text, color: colors?.light } : { backgroundColor: colors?.light, color: colors?.text }}
        >
            {item?.eventName}
        </button>
    )
}

const FancyBox = ({ colors, item, selectedEvent }: any) => {
    const [resultInput, setResultInput] = useState(item?.result || "");
    useEffect(() => {
        setResultInput(item?.result || "");
    }, [item, selectedEvent]);
    const fn_submit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            fancy: item,
            result: resultInput,
            eventId: selectedEvent?.eventId
        }
        const response = await updateFancyResultApi(data);
        if (response?.status) {
            return toast.success("Fancy Data Updated");
        }
    }
    return (
        <div className="min-h-[80px] rounded-[10px] p-[20px] flex justify-between items-center py-[20px]" style={{ backgroundColor: colors.light }}>
            <p style={{ color: colors?.subText }}>{item?.nat}</p>
            <form className="flex gap-[10px]" onSubmit={fn_submit}>
                <input
                    value={resultInput}
                    onChange={(e) => setResultInput(e.target.value)}
                    placeholder="Enter Result..."
                    className="h-[40px] rounded-[8px] min-w-[150px] text-[14px] px-[15px]"
                />
                <button
                    type="submit"
                    style={{ backgroundColor: colors.text, color: colors?.light }}
                    className="min-w-[max-content] text-nowrap text-[15px] font-[500] h-[40px] rounded-[7px] max-w-[max-content] px-[20px] flex justify-center items-center"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
