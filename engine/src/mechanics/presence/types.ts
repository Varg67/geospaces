/** Co-presence regimes delivered to the character (engine rules §4). */
export type PresenceRegime =
  | "CO_PRESENT"
  | "CO_PRESENT_IDLE"
  | "CO_PRESENT_IN_TRANSIT"
  | "SAME_PLACE_DIFFERENT_ROOM"
  | "REMOTE_WAITING"
  | "REMOTE_ONLY";
