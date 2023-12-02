import fsExtra from "fs-extra";

const dataFilePath = "./data.json";

function fetchApiLadderboard() {
  throw new Error("Not implemented");
}

async function fetchFileLadderboard() {
  const data = await fsExtra.readJson(dataFilePath);
  const membersArray = Object.values(data.members);

  // paginate
  return paginate(membersArray, 5);
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
