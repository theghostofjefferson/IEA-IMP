/** Where the newest notice lives on /notices, and what the front page says about it. */
export const DISCRIMINATION_NOTICE = {
  id: "discrimination",
  date: "2026-11-14",
  dateLabel: "14 November 2026",
  title: "Our research on discrimination is nearing its end",
  standfirst: "Voices from the student submissions we have received",
} as const;

/** The Office of the Founder's notice on the reconstitution of personnel. */
export const PERSONNEL_NOTICE = {
  id: "personnel",
  date: "2026-11-23",
  dateLabel: "23 November 2026",
  title: "Revisions to the About section and the reconstitution of personnel",
} as const;

/** The offices named in that notice, as published. */
export const PERSONNEL_VACATED: readonly { name: string; role: string }[] = [
  { name: "Aishani Rai", role: "Editorial Lead" },
  { name: "Prajjwal Dhakal", role: "Management Advisor" },
  { name: "Nischal Ghimire", role: "Research Executive" },
  { name: "Kaustuv Rimal", role: "Research Executive" },
  { name: "Aaditya Jha", role: "Research Executive" },
  { name: "Aadarsha Pandey", role: "Research Analyst" },
  { name: "Piyush Joshi", role: "Research Analyst" },
  { name: "Pratyush Neupane", role: "Research Analyst" },
  { name: "Sambriddhi Bhattarai", role: "Research Analyst" },
  { name: "Kashyap Shrestha", role: "Research Analyst" },
];

/** The Office of the Founder's notice on the temporary website restrictions. */
export const RESTRICTIONS_NOTICE = {
  id: "restrictions",
  date: "2026-11-26",
  dateLabel: "26 November 2026",
  title: "Temporary Website Restrictions and Institutional Information Security Measures",
} as const;
