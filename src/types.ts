export interface AvailabilityResource {
  resource_id: number;
  resource_name: string;
  resource_type: number;
  granularity: number;
  time_slot_count: number;
  static_time_slot: boolean;
  reservations_by_timeslot: null | any;
  note_available: boolean;
  note_required: boolean;
  note_description: string | null;
  description: string;
  description_html: string;
  capacity: number;
  site_timezone: string;
  user_name_required: boolean;
  user_phone_required: boolean;
  user_name_available: boolean;
  user_phone_available: boolean;
  time_before_reservations_closed: number | null;
  min_places_per_reservation: number | null;
  max_places_per_reservation: number | null;
  image_url: string | null;
  services: any[];
  slots_state: "available" | "full"
  hours: { [key: string]: any }[];
  next_open_day: string | null;
  next_available_day: string | null;
}
