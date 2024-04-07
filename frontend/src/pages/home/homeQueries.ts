import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";

function listingQuery() {
  const listingProps = {
    user: "JaneDoe42",
    description: "Need 300 level electives",
    have: "PHIL 300",
    want: "CS 310, CS 349, CS 345, CS 343",
    tags: ["CS", "Electives", "300+"],
    created_at: new Date().toISOString(), // ISO date string for today
  };

  const listingProps2 = {
    user: "JohnDoe42",
    description: "Need 400 level electives",
    have: "PHIL 400",
    want: "CS 410, CS 449, CS 445, CS 443",
    tags: ["CS", "Electives", "400+"],
    created_at: "2024-04-06T15:30:00Z", // Adjusted to ISO date string format
  };

  const listingProps3 = {
    user: "AliceSmith88",
    description: "Looking for economics electives",
    have: "ECON 200, ECON 301",
    want: "ECON 401, ECON 402",
    tags: ["Economics", "Electives"],
    created_at: new Date("2024-03-31").toISOString(),
  };

  const listingProps4 = {
    user: "BobJohnson99",
    description: "Searching for advanced math courses",
    have: "MATH 200, MATH 301",
    want: "MATH 401, MATH 402",
    tags: ["Mathematics", "Advanced", "Electives"],
    created_at: new Date("2024-03-24").toISOString(),
  };

  const listingProps5 = {
    user: "EmilyWong76",
    description: "In need of biology elective options",
    have: "BIOL 200, BIOL 301",
    want: "BIOL 401, BIOL 402",
    tags: ["Biology", "Electives"],
    created_at: new Date("2024-03-17").toISOString(),
  };

  const listingProps6 = {
    user: "DavidBrown23",
    description: "Seeking literature elective suggestions",
    have: "ENGL 200, ENGL 301",
    want: "ENGL 401, ENGL 402",
    tags: ["Literature", "Electives"],
    created_at: new Date("2024-03-10").toISOString(),
  };

  const listingProps7 = {
    user: "GraceTaylor47",
    description: "Looking for history elective courses",
    have: "HIST 200, HIST 301",
    want: "HIST 401, HIST 402",
    tags: ["History", "Electives"],
    created_at: new Date("2024-03-03").toISOString(),
  };


  return [
    listingProps,
    listingProps2,
    listingProps3,
    listingProps4,
    listingProps5,
    listingProps6,
    listingProps7,
  ];
}

interface TrendingClass {
  id: number;
  class_name: string;
  department: string;
  want_count: number;
  drop_count: number;
}

async function trendingQuery(): Promise<TrendingClass[]> {
  const trending = await fetchData("trending");

  if (!trending) return [];

  return trending;
}

const useTrending = () => useQuery<TrendingClass[]>("trending", trendingQuery);

export { listingQuery, trendingQuery, useTrending };
