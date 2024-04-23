"use client";

import AddEventForm from "@/components/forms/AddEventForm";
import { EventFormData } from "@/types";
import { useState } from "react";

export default function AddEventPage() {
  //event formData state
  const [formData, setFormData] = useState<EventFormData>();
  const [loading, setLoading] = useState(false);

  async function addEvent() {
    //add event logic here
    console.log("adding event");
  }
  return (
    <div>
      <h1>Add Event</h1>
				<AddEventForm handleSubmit={addEvent} formData={formData} setFormData={setFormData} loading={loading} />
				
				
    </div>
  );
}