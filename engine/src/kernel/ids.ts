import type { Brand } from "./brand.ts";

export type PlaceId = Brand<string, "PlaceId">;
export type CharacterId = Brand<string, "CharacterId">;
export type JourneyId = Brand<string, "JourneyId">;
export type VehicleId = Brand<string, "VehicleId">;
export type LineId = Brand<string, "LineId">;
export type CommitmentId = Brand<string, "CommitmentId">;

export const placeId = (value: string) => value as PlaceId;
export const characterId = (value: string) => value as CharacterId;
export const journeyId = (value: string) => value as JourneyId;
export const vehicleId = (value: string) => value as VehicleId;
export const lineId = (value: string) => value as LineId;
export const commitmentId = (value: string) => value as CommitmentId;
