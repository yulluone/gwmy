"use client";

import { useSupabase, userContext } from "@/context/supabase-context";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/forms/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  name: string;
  cover: string;
  price: string;
  host: string;
  start_date: string;
  end_date: string;
}

interface TicketingFormData {
  name?: string;
  phone?: string;
}

export default function Event({ params }: { params: { id: string } }) {
  const eventId = params.id;

  const user = userContext();

  const router = useRouter();

  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TicketingFormData>();
  const [startDate, setStartDate] = useState<{
    day: number;
    month: string;
    dayOfWeek: string;
  }>();
  const [endDate, setEndDate] = useState<{
    day: number;
    month: string;
    dayOfWeek: string;
  }>();

  //fetch event from supabase
  const { supabase } = useSupabase();
  const fetchEvent = async () => {
    try {
      const { error, data } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId);

      if (error) throw error;
      setEvent(data[0]);
      setStartDate(formatDate(data[0].start_date));
      setEndDate(formatDate(data[0].end_date));
    } catch (error) {
      // console.error("Error fetching event", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [undefined]);

  async function handleTicketing() {
    if (!formData || !formData.name || !formData.phone) return;
    setTimeout(() => {
      setLoading(true);
    }, 5);
    try {
      const { data, error } = await supabase
        .from("tickets")
        .insert([
          {
            holders_name: formData.name,
            phone: formData.phone,
            event_id: event?.id,
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      toast.success("Ticket purchased, redirecting to ticket...");
      router.push(`/events/tickets/${data[0].id}`);
      setTimeout(() => {}, 1);
    } catch (error) {
      toast.error("Failed to purchase ticket, please try again");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const formattedDate = {
      day,
      month,
      dayOfWeek,
    };
    console.log(formattedDate);
    return formattedDate;
  }

  function formatTime(timeString: string) {
    const [hours, minutes] = timeString.split(":");
    let formattedTime;
    if (Number(hours) < 12) {
      formattedTime = `${parseInt(hours)}:${minutes} AM`;
    } else if (hours === "12") {
      formattedTime = `12:${minutes} PM`;
    } else {
      formattedTime = `${parseInt(hours) - 12}:${minutes} PM`;
    }
    return formattedTime;
  }

  return (
    <div>
      {event && startDate && endDate && (
        <div className="flex flex-col gap-7 overflow-x-hidden">
          {/* Album name and cover */}

          <div className="flex min-h-[200px] items-end bg-light-600  dark:bg-dark-200 md:h-[50vh] ">
            <div className="flex w-full flex-col items-start gap-2 pb-4 sm:flex-row sm:items-end sm:pl-4 ">
              <div className="relative h-[100vw] min-h-[150px] w-[100vw] min-w-[150px] rounded shadow sm:h-[30vw] sm:max-h-[45vh] sm:w-[40vw] sm:max-w-[48vh] ">
                <Image
                  src={event.cover}
                  alt={event.name}
                  fill
                  className="rounded object-cover shadow-lg "
                />
              </div>

              <div className="relative flex h-full  w-full items-end justify-between px-2 sm:h-[30vw] sm:items-end sm:px-2 ">
                <div className="absolute bottom-2 right-2 z-10  flex flex-col items-center gap-2 rounded bg-light-300 pt-2 text-sm font-medium  shadow  transition-all  duration-500 group-hover:opacity-0  dark:bg-dark-400 ">
                  <div className="flex flex-col items-center gap-2 px-1">
                    <span className="px-1 ">
                      {startDate.dayOfWeek === endDate.dayOfWeek
                        ? startDate.dayOfWeek
                        : `${startDate.dayOfWeek} - ${endDate.dayOfWeek}`}
                    </span>

                    <span className=" px-1	text-base font-semibold text-brand">
                      {startDate.day === endDate.day
                        ? startDate.day
                        : `${startDate.day} - ${endDate.day}`}
                    </span>

                    <span className="px-1 ">
                      {startDate.month === endDate.month
                        ? startDate.month
                        : `${startDate.month} - ${endDate.month}`}
                    </span>
                  </div>
                  <span className="w-full rounded-b bg-brand py-2 text-center text-base font-bold text-light ">
                    {Number(event.price) > 0 ? `Ksh. ${event.price}` : "FREE"}
                  </span>
                </div>

                <div className="order-1 flex flex-col gap-2 pl-4  md:gap-4">
                  <h3 className=" font-medium">Event</h3>
                  <h1 className="text-3xl font-bold xs:text-2xl sm:text-3xl md:text-4xl  lg:text-5xl">
                    {event.name}{" "}
                  </h1>
                  <h3 className="flex flex-wrap gap-2 text-base font-medium">
                    <span>{event.host}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="pb-7 ">
            <h1 className="px-4 text-2xl font-medium text-dark-300 dark:text-light-800">
              Get your ticket 👇
            </h1>
            {/* get ticket form */}

            <form
              action={handleTicketing}
              className="flex w-full flex-col gap-7 p-4"
            >
              <div className="flex w-full flex-col gap-4 sm:flex-row ">
                <Input
                  id="name"
                  name="name"
                  required
                  label="Enter your name"
                  placeholder="Enter your name"
                  className="w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  id="phone"
                  name="phone"
                  required
                  label="Enter your phone number"
                  placeholder="07********	"
                  className="w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="flex w-full justify-end">
                <Button
                  type="submit"
                  isLoading={loading}
                  className="relative h-10 w-44 rounded-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Get Ticket"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
