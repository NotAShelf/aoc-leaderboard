import fsExtra from "fs-extra";

const DATA_FILE_PATH = "./data.json";

function fetchApiLadderboard() {
  throw new Error("Not implemented");
}

async function fetchFileLadderboard() {
  const data = await fsExtra.readJson(DATA_FILE_PATH);
  const membersArray = Object.values(data.members);
  sortByScore(membersArray);

  // paginate
  return paginate(membersArray, 5);
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

export default fetchFileLadderboard;
