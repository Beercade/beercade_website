// Minimal typings for the OPDB responses we consume.
// Full schema: https://opdb.org/api  — we only model the fields we read.

export interface OpdbTypeaheadResult {
  /** e.g. "G43W4-MrR6w" or a group id like "G43W4" */
  id: string;
  /** Display name, may include manufacturer + year in parentheses */
  text: string;
  name: string;
  /** Present on typeahead rows; both can be empty strings */
  manufacturer: string | null;
  year: number | null;
}

export interface OpdbManufacturer {
  manufacturer_id: number;
  name: string;
}

export interface OpdbMachine {
  opdb_id: string;
  is_machine: boolean;
  name: string;
  common_name: string | null;
  shortname: string | null;
  /** ISO-ish date string, e.g. "1992-03-01"; can be null */
  manufacture_date: string | null;
  manufacturer: OpdbManufacturer | null;
  /** Tech type: "SS" | "EM" | "DMD" etc. NOT our pinball/arcade enum. */
  type: string | null;
  ipdb_id: number | null;
}
