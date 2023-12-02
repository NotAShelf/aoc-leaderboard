import fsExtra from "fs-extra";
import axios from "axios";

import { aocToken, ladderBoardNumber } from "../utils/config.js";

const DATA_FILE_PATH = "./data.json";

const NB_MEMBER_PER_PAGE = 5;
async function fetchApiLadderboard() {
  const res = await axios.get(
    `https://adventofcode.com/2023/leaderboard/private/view/${
      ladderBoardNumber.split("-")[0]
    }.json`,
    {
      headers: {
        Cookie: `session=${aocToken}`,
      },
    },
  );

  if (res.status != "200") {
    console.err(`error: ${res.status}, ${res.statusText}`);
    return [];
  }

  const members = Object.values(res.data.members);
  sortByScore(members);
  return paginate(members, NB_MEMBER_PER_PAGE);
}

async function fetchFileLadderboard() {
  const data = await fsExtra.readJson(DATA_FILE_PATH);
  const membersArray = Object.values(data.members);
  sortByScore(membersArray);

  // paginate
  return paginate(membersArray, NB_MEMBER_PER_PAGE);
}

function sortByScore(array) {
  if (!Array.isArray(array)) {
    throw new Error("Expected an array");
  }

  array.sort((a, b) => b.local_score - a.local_score);
}

function paginate(array, page_size) {
  if (!Array.isArray(array)) {
    throw new Error("Expected an array");
  }

  const pages = [];
  for (let i = 0; i < array.length; i += page_size) {
    pages.push(array.slice(i, i + page_size));
  }

  return pages;
}

export default fetchApiLadderboard;
