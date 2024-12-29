import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

const data = [
  { date: "2024-08-05", title: "Paragliding", color: "#DC2626" },
  { date: "2024-08-12", title: "Family Dinner", color: "#EA580C" },
  { date: "2024-08-17", title: "Dart Game", color: "#EA580C" },
  { date: "2024-08-19", title: "Doctor’s Visit", color: "#DC2626" },
  { date: "2024-08-19", title: "Client Meeting", color: "#6B7280" },
  { date: "2024-08-21", title: "Family Trip", color: "#16A34A" },
  { date: "2024-08-24", title: "Seminar 2023", color: "#6B7280" },
];

// sort dataa by date

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const renderCalendarDays = (year, month) => {
  const daysInMonth = getDaysInMonth(month, year);
  const startDay = new Date(year, month, 1).getDay();
  const rows = [];
  let cells = [];

  for (let i = 0; i < startDay; i++) {
    cells.push(<td key={`empty-${i}`}></td>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const events = data.filter((event) => event.date === currentDate);

    cells.push(
      <td key={day} className="p-2">
        <div className="relative w-8 h-8 mx-auto text-center leading-loose">
          {day}
          {events.map((event, index) => (
            <span
              key={index}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: `${event.color}`,
                opacity: 0.3,
                top: "50%",
                left: "50%",
                width: "1.5rem",
                height: "1.5rem",
                transform: "translate(-50%, -50%)",
              }}
            ></span>
          ))}
        </div>
      </td>
    );

    if ((day + startDay) % 7 === 0 || day === daysInMonth) {
      rows.push(<tr key={day}>{cells}</tr>);
      cells = [];
    }
  }

  return rows;
};

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [addData, setAddData] = useState({
    date: new Date(),
    task: "",
  });
  const [currentMonth, setCurrentMonth] = useState(7);
  const [currentYear, setCurrentYear] = useState(2024);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddDate = () => {
    console.log(addData);
    if (addData.date === "" || addData.task === "") return;

    data.push({
      date: addData.date,
      title: addData.task,
      color: "#6B7280",
    });
    setAddData({ date: new Date(), task: "" });
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);
  const leadingEmptyDays = Array.from({ length: firstDayOfMonth });
  const calendarDays = [...leadingEmptyDays, ...daysArray];

  const getEventsForDay = (day) => {
    const dayString = day < 10 ? `0${day}` : day;
    const monthString = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const date = `${currentDate.getFullYear()}-${monthString}-${dayString}`;
    return data.filter((event) => event.date === date);
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  return (
    <>
      {/* pc view */}
      <div className="w-full px-5 py-10 mx-auto">
        <div className="flex items-center justify-center gap-5 mb-4">
          <button onClick={() => changeMonth(-1)} className="text-lg font-bold">
            <IoIosArrowDropleft className="text-3xl" />
          </button>
          <h2 className="text-lg font-bold">
            {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
          </h2>
          <button onClick={() => changeMonth(1)} className="text-lg font-bold">
            <IoIosArrowDropright className="text-3xl" />
          </button>
        </div>
        <div className="hidden lg:block md:block">
          <div className="flex flex-col bg-white lg:flex-row gap-y-2">
            <div className="px-5 border-r min-w-[190px] lg:py-10 flex lg:flex-col flex-row md:justify-between lg:justify-start gap-x-2 lg:items-start md:items-center">
              <p className="text-sm font-semibold leading-none text-gray-800">
                Calendar
              </p>

              <div className="flex flex-col gap-y-4 mt-6">
                <Dialog>
                  <DialogTrigger>
                    <button className="px-5 py-1.5 bg-blue-500 text-white text-sm rounded-sm hover:bg-blue-600">
                      Add Task
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add new task</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col w-full px-3 gap-4">
                      <input
                        type="date"
                        value={addData.date}
                        placeholder="date"
                        className="w-full p-2"
                        onChange={(e) => {
                          setAddData({ ...addData, date: e.target.value });
                        }}
                      />
                      <input
                        onChange={(e) => {
                          setAddData({ ...addData, task: e.target.value });
                        }}
                        value={addData.task}
                        type="text"
                        placeholder="task"
                        className="w-full p-2"
                      />
                      <DialogClose asChild>
                        <button
                          onClick={() => {
                            handleAddDate();
                          }}
                          className=" bg-slate-950 rounded-md p-2 text-white"
                        >
                          Add
                        </button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                <button className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-sm hover:bg-red-600">
                  Delete Task
                </button>
              </div>
            </div>

            <div className="w-full xl:overflow-x-hidden">
              <table className="min-w-full bg-white">
                <thead className="items-center">
                  <tr className="h-20">
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Sun
                      </p>
                    </th>
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Mon
                      </p>
                    </th>
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Tue
                      </p>
                    </th>
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Wed
                      </p>
                    </th>
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Thu
                      </p>
                    </th>
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Fri
                      </p>
                    </th>
                    <th className="px-10 border-b border-r">
                      <p className="text-sm font-medium text-center text-gray-600 cursor-pointer">
                        Sat
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(Math.ceil(calendarDays.length / 7)).keys()].map(
                    (week) => (
                      <tr key={week} className="border-b border-gray-300">
                        {calendarDays
                          .slice(week * 7, (week + 1) * 7)
                          .map((day, index) => (
                            <td
                              key={index}
                              className={`border-r border-gray-300 p-2 ${
                                day === null ? "bg-gray-200" : ""
                              }`}
                            >
                              <div className="flex flex-col h-full min-h-[100px]">
                                {" "}
                                <p className="pt-2 pb-2 text-xs text-gray-600">
                                  {day}
                                </p>
                                <div className="flex flex-col space-y-1">
                                  {day &&
                                    getEventsForDay(day).map(
                                      (event, eventIndex) => (
                                        <div
                                          key={eventIndex}
                                          className="flex items-center px-1 py-1 rounded"
                                          style={{
                                            backgroundColor: `${event.color}20`,
                                          }}
                                        >
                                          <div
                                            className="border-l-4"
                                            style={{ borderColor: event.color }}
                                          ></div>
                                          <p
                                            className="text-xs font-medium leading-3 ml-1"
                                            style={{ color: event.color }}
                                          >
                                            {event.title}
                                          </p>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            </td>
                          ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="w-full px-5 mx-auto lg:hidden">
        <div className="flex justify-evenly mb-10">
          <Dialog>
            <DialogTrigger>
              <button className="px-5 py-1.5 bg-blue-500 text-white text-lg rounded-sm hover:bg-blue-600">
                Add Task
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col w-full px-3 gap-4">
                <input
                  type="date"
                  value={addData.date}
                  placeholder="date"
                  className="w-full p-2"
                  onChange={(e) => {
                    setAddData({ ...addData, date: e.target.value });
                  }}
                />
                <input
                  onChange={(e) => {
                    setAddData({ ...addData, task: e.target.value });
                  }}
                  value={addData.task}
                  type="text"
                  placeholder="task"
                  className="w-full p-2"
                />
                <DialogClose asChild>
                  <button
                    onClick={() => {
                      handleAddDate();
                    }}
                    className=" bg-slate-950 rounded-md p-2 text-white"
                  >
                    Add
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <button className="px-3 py-1.5 bg-red-500 text-white text-lg rounded-sm hover:bg-red-600">
            Delete Task
          </button>
        </div>

        <div className="flex justify-center gap-7 items-center">
          <button
            onClick={handlePrevMonth}
            className="text-lg font-semibold text-gray-800"
          >
            <IoIosArrowDropleft className="text-3xl" />
          </button>
          <span className="text-lg font-semibold text-gray-800">
            {months[currentMonth]} {currentYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="text-lg font-semibold text-gray-800"
          >
            <IoIosArrowDropright className="text-3xl" />
          </button>
        </div>

        <div className="flex items-center justify-between w-full px-1 pt-8 overflow-x-auto bg-white">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-lg font-medium text-center text-gray-600">
                  Su
                </th>
                <th className="text-lg font-medium text-center text-gray-600">
                  Mo
                </th>
                <th className="text-lg font-medium text-center text-gray-600">
                  Tu
                </th>
                <th className="text-lg font-medium text-center text-gray-600">
                  We
                </th>
                <th className="text-lg font-medium text-center text-gray-600">
                  Th
                </th>
                <th className="text-lg font-medium text-center text-gray-600">
                  Fr
                </th>
                <th className="text-lg font-medium text-center text-gray-600">
                  Sa
                </th>
              </tr>
            </thead>
            <tbody>{renderCalendarDays(currentYear, currentMonth)}</tbody>
          </table>
        </div>

        <div className="my-6">
          <h2 className="text-lg font-semibold leading-none text-gray-800">
            Events
          </h2>
          <ul className="mt-4">
            {data.map((item, index) => (
              <li
                key={index}
                className="flex items-center mb-3 rounded-md px-1"
                style={{ backgroundColor: `${item.color}20` }} // '20' is the hex transparency value
              >
                <span
                  className="w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-lg px-2 py-1 rounded flex w-full justify-between">
                  <div>{formatDate(item.date)}</div>
                  <div>{item.title}</div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Calendar;
